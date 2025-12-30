import { useState } from 'react';

import { banner, Rick } from '@assets';
import { Loader } from '@components';
import { CharacterCard, CharacterFilters } from '@widgets';

import type { Status } from '@types';

const character = {
  name: 'Rick Sanchez',
  gender: 'Male',
  species: 'Human',
  location: 'Earth',
  status: 'alive' as Status,
  photo: Rick
};

export const HomePage = () => {
  const [isLoading, _setIsLoading] = useState(false);

  return (
    <div className='flex flex-col justify-center items-center'>
      <img src={banner} />
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className='flex flex-col gap-7 items-start'>
          <CharacterFilters />
          <CharacterCard character={character} />
        </div>
      )}
    </div>
  );
};
