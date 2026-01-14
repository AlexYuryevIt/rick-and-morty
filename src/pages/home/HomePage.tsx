import { useCallback, useEffect } from 'react';

import { banner } from '@assets';
import { ErrorMessage, InfiniteScroll, Loader } from '@components';
import { NOTIFICATION_TYPE, NOTIFICATIONS, UNEXPECTED_ERROR } from '@constants';
import { notify } from '@helpers';
import { useGetCharacters } from '@hooks';
import { useCharactersStore, useFiltersStore } from '@stores';
import { CharacterCard, CharacterFilters } from '@widgets';

import type { TCharacter } from '@types';

export const HomePage = () => {
  const { resetFilters } = useFiltersStore();

  const {
    errorMessage,
    isPending,
    isError,
    isFetchingMore,
    hasNextPage,
    loadMore,
    updateCharacter,
    refetch
  } = useGetCharacters();

  const { characters } = useCharactersStore();

  useEffect(() => {
    if (isError && errorMessage) {
      notify(errorMessage, NOTIFICATION_TYPE.error);
    }
  }, [isError, errorMessage]);

  const handleGoBack = () => {
    resetFilters();
  };

  const handleUpdateCharacter = (character: TCharacter) => {
    updateCharacter(character);

    if (!isError) {
      notify(NOTIFICATIONS.characterUpdated, NOTIFICATION_TYPE.success);
    }
  };

  const handleLoadMore = useCallback(() => {
    loadMore();
  }, [loadMore]);

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

      {isPending && (
        <div>
          <Loader />
        </div>
      )}

      <div className='flex flex-col gap-7 items-center'>
        <InfiniteScroll
          hasNext={hasNextPage}
          isLoading={isFetchingMore}
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
