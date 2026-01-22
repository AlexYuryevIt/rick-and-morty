import { useCallback, useEffect } from 'react';

import { banner } from '@assets';
import { ErrorMessage, InfiniteScroll, Loader } from '@components';
import { NOTIFICATION_TYPE, NOTIFICATIONS, UNEXPECTED_ERROR } from '@constants';
import { notify } from '@helpers';
import { useGetCharacters } from '@hooks';
import { useCharactersStore, useFiltersStore } from '@stores';
import { CharacterCard, CharacterFilters } from '@widgets';

import styles from './HomePage.module.scss';

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
    <div className={styles.home__page}>
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

      <div className={styles.list__wrapper}>
        <InfiniteScroll
          hasNext={hasNextPage}
          isLoading={isFetchingMore}
          loadMore={handleLoadMore}
        >
          <div className={styles.list}>
            {!isPending &&
              characters &&
              characters.map((char) => (
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
