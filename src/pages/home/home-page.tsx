import { useState } from 'react';

import { banner } from '@assets';
import { Loader, Selector, StatusDot } from '@components';
import { speciesOptions, statusOptions } from '@constants';

import type { Status } from '@types';

export const HomePage = () => {
  const [isLoading, _setIsLoading] = useState(false);
  const [species, setSpecies] = useState<string | null>(null);
  const [status, setStatus] = useState<Status | null>(null);

  const handleSetSpecies = (value: string | null) => setSpecies(value);

  return (
    <div className='flex flex-col justify-center items-center'>
      <img src={banner} />
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className='flex gap-2.5 items-start'>
          <Selector
            options={speciesOptions}
            placeholder='Species'
            size='big'
            value={species}
            onSelect={handleSetSpecies}
            hasClearButton={true}
          />
          <Selector
            options={statusOptions}
            size='small'
            value={status}
            onSelect={setStatus}
            hasClearButton={true}
            OptionComponent={({ option }) => (
              <div className='flex gap-1 items-center'>
                <p>{option.label}</p>
                <StatusDot status={option.value} />
              </div>
            )}
          />
        </div>
      )}
    </div>
  );
};
