import { useEffect, useState } from 'react';

import { banner } from '@assets';
import { ErrorMessage, InfiniteScroll, Loader } from '@components';
import { NOTIFICATION_TYPE, NOTIFICATIONS, UNEXPECTED_ERROR } from '@constants';
import { notify } from '@helpers';
import { useDebounce, useGetCharacters } from '@hooks';
import { CharacterCard, CharacterFilters } from '@widgets';

import type { TCharacter, TFilters } from '@types';

const initialFiltersState = {
  name: '',
  species: null,
  gender: null,
  status: null
};

export const HomePage = () => {
  const [filters, setFilters] = useState<TFilters>(initialFiltersState);

  const debouncedFilters = useDebounce(filters);

  const handleGoBack = () => setFilters(initialFiltersState);

  const {
    characters,
    isLoading,
    isError,
    errorMessage,
    hasNext,
    loadMore,
    refetch,
    updateCharacter
  } = useGetCharacters(debouncedFilters);

  useEffect(() => {
    if (errorMessage) {
      notify(errorMessage, NOTIFICATION_TYPE.error);
    }
  }, [errorMessage]);

  const handleUpdateCharacter = (character: TCharacter) => {
    updateCharacter(character);

    if (!isError) {
      notify(NOTIFICATIONS.characterUpdated, NOTIFICATION_TYPE.success);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center gap-4'>
      <img
        src={banner}
        width={600}
        height={200}
        alt='Rick And Morty text logo'
      />

      <CharacterFilters
        filters={filters}
        setFilters={setFilters}
      />

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
          hasNext={hasNext}
          isLoading={isLoading}
          loadMore={loadMore}
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
