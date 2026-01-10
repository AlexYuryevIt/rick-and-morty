import { useEffect } from 'react';

import { initialPage } from '@constants';
import { useCharactersStore } from '@stores';

import { useDebounce } from './useDebounce';

export const useFilters = () => {
  const { filters, fetchCharacters } = useCharactersStore();

  const debouncedFilters = useDebounce(filters);

  useEffect(() => {
    fetchCharacters(debouncedFilters, initialPage);
  }, [debouncedFilters, fetchCharacters]);
};
