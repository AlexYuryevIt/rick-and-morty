import { useCallback, type ChangeEvent } from 'react';

import { Search } from '@assets';
import { Input, Selector } from '@components';
import { genderOptions, speciesOptions, statusOptions } from '@constants';
import { type TFilters } from '@types';

import type { TFiltersProps } from './types';

export const CharacterFilters = ({ filters, setFilters }: TFiltersProps) => {
  const handleSetFilter = useCallback(
    (value: string | null, field: keyof TFilters) => {
      setFilters((prev) => ({ ...prev, [field]: value }));
    },
    [setFilters]
  );

  const handleSetName = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setFilters((prev) => ({ ...prev, name: value }));
  };

  const handleClearName = () => {
    setFilters((prev) => ({ ...prev, name: '' }));
  };

  return (
    <div className='flex gap-7 items-center justify-between'>
      <Input
        onChange={handleSetName}
        onClear={handleClearName}
        value={filters.name}
        icon={<Search />}
        size='big'
        placeholder='Filter by name...'
      />
      <Selector
        options={speciesOptions}
        value={filters.species}
        placeholder='Species'
        onSelect={(value) => handleSetFilter(value, 'species')}
      />
      <Selector
        options={genderOptions}
        value={filters.gender}
        placeholder='Gender'
        onSelect={(value) => handleSetFilter(value, 'gender')}
      />
      <Selector
        options={statusOptions}
        value={filters.status}
        placeholder='Status'
        onSelect={(value) => handleSetFilter(value, 'status')}
      />
    </div>
  );
};
