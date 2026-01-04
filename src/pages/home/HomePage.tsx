import { useState } from 'react';

import { banner } from '@assets';
import { ErrorMessage, InfiniteScroll, Loader } from '@components';
import { UNEXPECTED_ERROR } from '@constants';
import { useDebounce, useGetCharacters } from '@hooks';
import { CharacterCard, CharacterFilters } from '@widgets';

import type { TFilters } from '@types';

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
                onSave={updateCharacter}
              />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};
