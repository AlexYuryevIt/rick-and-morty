import { useState } from 'react';

import { banner } from '@assets';
import { Loader, Selector, StatusDot } from '@components';
import { selectorOptions } from '@constants';

export const HomePage = () => {
  const [isLoading, _setIsLoading] = useState(false);
  const [species, setSpecies] = useState('');
  const [status, setStatus] = useState(selectorOptions.status[0]);

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
            size='big'
            value={species}
            onSelect={setSpecies}
          />
          <Selector
            options={selectorOptions.status}
            size='small'
            value={status}
            onSelect={setStatus}
            renderStatusIcon={(option) => {
              if (option === 'Alive') return <StatusDot color={'green'} />;
              if (option === 'Dead') return <StatusDot color={'red'} />;
              if (option === 'Unknown') return <StatusDot color='orange' />;
            }}
          />
        </div>
      )}
    </div>
  );
};
