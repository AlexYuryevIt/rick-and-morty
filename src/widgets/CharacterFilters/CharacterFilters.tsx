import { useCallback, useEffect, useState, type ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { Search } from '@assets';
import { Input, Selector } from '@components';
import { genderOptions, speciesOptions, statusOptions } from '@constants';
import { useDebounce } from '@hooks';
import { useFiltersStore } from '@stores';

import styles from './CharacterFilters.module.scss';

export const CharacterFilters = () => {
  const { filters, setFilter } = useFiltersStore();
  const { t } = useTranslation('filters');

  const [name, setName] = useState(filters.name);
  const debouncedName = useDebounce(name);

  const handleSetName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      setName(value);
    },
    [setName]
  );

  useEffect(() => {
    if (debouncedName) {
      setFilter(debouncedName, 'name');
    }
  }, [debouncedName, setFilter]);

  const handleClearName = () => {
    setName('');
    setFilter('', 'name');
  };

  return (
    <div className={styles.filters}>
      <Input
        onChange={handleSetName}
        onClear={handleClearName}
        value={name}
        icon={<Search />}
        size='big'
        placeholder={t('name')}
      />
      <Selector
        options={speciesOptions()}
        value={filters.species}
        placeholder={t('species.placeholder')}
        onSelect={(value) => setFilter(value, 'species')}
      />
      <Selector
        options={genderOptions()}
        value={filters.gender}
        placeholder={t('gender.placeholder')}
        onSelect={(value) => setFilter(value, 'gender')}
      />
      <Selector
        options={statusOptions()}
        value={filters.status}
        placeholder={t('status.placeholder')}
        onSelect={(value) => setFilter(value, 'status')}
      />
    </div>
  );
};
