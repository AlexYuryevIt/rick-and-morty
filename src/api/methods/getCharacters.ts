import axios from 'axios';

import { BASE_URL, ENDPOINTS } from '../paths';
import { getQueryParams } from '../utils/getQueryParams';

import type { TFilters } from '@types';

export const getCharacters = async (
  filters: TFilters,
  page: number,
  signal?: AbortSignal
) => {
  const URL = `${BASE_URL}${ENDPOINTS.characters}`;
  console.log(filters);
  const params: Record<string, string> = getQueryParams(filters);

  console.log('Fetching characters with params:', { ...params, page });

  const { data } = await axios.get(URL, {
    params: { ...params, page },
    signal
  });

  return {
    characters: data.results,
    hasNext: Boolean(data.info.next)
  };
};
