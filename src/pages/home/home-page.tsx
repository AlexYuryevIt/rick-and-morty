import { useState } from 'react';

import { banner, Rick } from '@assets';
import { Loader } from '@components';
import { CharacterCard } from '@widgets';

import type { Status } from '@types';

export const HomePage = () => {
  const [isLoading, _setIsLoading] = useState(false);

  const character = {
    name: 'Rick Sanchez',
    gender: 'Male',
    species: 'Human',
    location: 'Earth',
    status: 'alive' as Status,
    photo: Rick
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      <img src={banner} />
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className='flex gap-2.5 items-start'>
          <CharacterCard character={character} />
        </div>
      )}
    </div>
  );
};
