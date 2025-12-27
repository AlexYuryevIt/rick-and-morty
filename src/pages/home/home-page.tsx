import { useState, type ChangeEvent } from 'react';

import { banner, Search } from '@assets';
import { Input, Loader, Selector, StatusDot } from '@components';
import { speciesOptions, statusOptions } from '@constants';

import type { Status } from '@types';

export const HomePage = () => {
  const [isLoading, _setIsLoading] = useState(false);
  const [species, setSpecies] = useState<string | null>(null);
  const [status, setStatus] = useState<Status | null>(null);
  const [name, setName] = useState('');
  const [filter, setFilter] = useState('');

  const handleSetSpecies = (value: string | null) => setSpecies(value);

  const handleSetName = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setName(value);
  };

  const handleSetFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setFilter(value);
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
            clearButtonSize='small'
            OptionComponent={({ option }) => (
              <div className='flex gap-1 items-center'>
                <p>{option.label}</p>
                <StatusDot status={option.value} />
              </div>
            )}
          />
          <Input
            value={filter}
            onChange={handleSetFilter}
            onClear={setFilter}
            size='big'
            placeholder='Filter by name...'
            icon={
              <Search
                height={'16px'}
                width={'16px'}
              />
            }
          />
          <Input
            value={name}
            onChange={handleSetName}
            onClear={setName}
            size='small'
          />
        </div>
      )}
    </div>
  );
};
