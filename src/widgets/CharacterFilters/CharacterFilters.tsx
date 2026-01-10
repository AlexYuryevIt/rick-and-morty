import { useCallback, type ChangeEvent } from 'react';

import { Search } from '@assets';
import { Input, Selector } from '@components';
import {
  CHARACTER_FIELDS_LABELS,
  genderOptions,
  speciesOptions,
  statusOptions
} from '@constants';
import { useCharactersStore } from '@stores';

export const CharacterFilters = () => {
  const { filters, setFilter } = useCharactersStore();

  const handleSetName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      setFilter(value, 'name');
    },
    [setFilter]
  );

  const handleClearName = () => {
    setFilter('', 'name');
  };

  return (
    <div
      className='
      grid gap-4
      grid-cols-2
      lg:flex lg:items-center lg:justify-between lg:gap-7
      '
    >
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
        placeholder={CHARACTER_FIELDS_LABELS.SPECIES}
        onSelect={(value) => setFilter(value, 'species')}
      />
      <Selector
        options={genderOptions}
        value={filters.gender}
        placeholder={CHARACTER_FIELDS_LABELS.GENDER}
        onSelect={(value) => setFilter(value, 'gender')}
      />
      <Selector
        options={statusOptions}
        value={filters.status}
        placeholder={CHARACTER_FIELDS_LABELS.STATUS}
        onSelect={(value) => setFilter(value, 'status')}
      />
    </div>
  );
};
