import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { banner } from '@assets';
import { ErrorMessage, InfiniteScroll, Loader } from '@components';
import { NOTIFICATION_TYPE } from '@constants';
import { notify } from '@helpers';
import { useGetCharacters } from '@hooks';
import { useCharactersStore, useFiltersStore } from '@stores';
import { CharacterCard, CharacterFilters } from '@widgets';

import styles from './HomePage.module.scss';

import type { TCharacter } from '@types';

export const HomePage = () => {
  const { resetFilters } = useFiltersStore();
  const { t } = useTranslation(['notifications', 'errors']);

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
      notify(t(`errors:api.${errorMessage}`), NOTIFICATION_TYPE.error);
    }
  }, [isError, errorMessage, t]);

  const handleGoBack = () => {
    resetFilters();
  };

  const handleUpdateCharacter = (character: TCharacter) => {
    updateCharacter(character);

    if (!isError) {
      notify(t('characterUpdated'), NOTIFICATION_TYPE.success);
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
          message={errorMessage ?? ''}
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
