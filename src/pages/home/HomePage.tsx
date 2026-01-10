import { startTransition, useCallback, useEffect } from 'react';

import { banner } from '@assets';
import { ErrorMessage, InfiniteScroll, Loader } from '@components';
import { NOTIFICATION_TYPE, NOTIFICATIONS, UNEXPECTED_ERROR } from '@constants';
import { notify } from '@helpers';
import { useFilters } from '@hooks';
import { useCharactersStore } from '@stores';
import { CharacterCard, CharacterFilters } from '@widgets';

import type { TCharacter } from '@types';

export const HomePage = () => {
  const {
    characters,
    filters,
    isError,
    isLoading,
    isLoadingMore,
    hasNextPage,
    errorMessage,
    refetch,
    loadMore,
    updateCharacter,
    resetFilters
  } = useCharactersStore();

  useFilters();

  useEffect(() => {
    if (errorMessage) {
      notify(errorMessage, NOTIFICATION_TYPE.error);
    }
  }, [errorMessage]);

  const handleGoBack = () => {
    resetFilters();
  };

  const handleUpdateCharacter = (character: TCharacter) => {
    startTransition(() => {
      updateCharacter(character);
    });

    if (!isError) {
      notify(NOTIFICATIONS.characterUpdated, NOTIFICATION_TYPE.success);
    }
  };

  const handleLoadMore = useCallback(() => {
    startTransition(() => {
      loadMore(filters);
    });
  }, [loadMore, filters]);

  return (
    <div className='flex flex-col justify-center items-center gap-4'>
      <img
        src={banner}
        width={600}
        height={200}
        alt='Rick And Morty text logo'
      />

      <CharacterFilters />

      {isError && (
        <ErrorMessage
          message={errorMessage ?? UNEXPECTED_ERROR}
          refetch={refetch}
          onGoBack={handleGoBack}
        />
      )}

      {isLoading && (
        <div>
          <Loader />
        </div>
      )}

      <div className='flex flex-col gap-7 items-center'>
        <InfiniteScroll
          hasNext={hasNextPage}
          isLoading={isLoadingMore}
          loadMore={handleLoadMore}
        >
          <div className='flex flex-wrap gap-7 items-center justify-center'>
            {characters.map((char) => (
              <CharacterCard
                character={char}
                key={char.id}
                onSave={handleUpdateCharacter}
              />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};
