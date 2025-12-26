import { useState } from 'react';

import { banner } from '@assets';
import { Loader, Selector, StatusDot } from '@components';
import { selectorOptions } from '@constants';

export const HomePage = () => {
  const [isLoading, _setIsLoading] = useState(false);
  const [species, setSpecies] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

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
            options={selectorOptions.species}
            placeholder='Species'
            size='xl'
            value={species}
            onSelect={handleSetSpecies}
            hasClearButton={true}
          />
          <Selector
            options={selectorOptions.status}
            size='sm'
            value={status}
            onSelect={setStatus}
            hasClearButton={true}
            OptionComponent={({ option }) => (
              <div className='flex gap-1 items-center'>
                <p>{option.label}</p>
                <StatusDot color={option.value} />
              </div>
            )}
          />
        </div>
      )}
    </div>
  );
};
