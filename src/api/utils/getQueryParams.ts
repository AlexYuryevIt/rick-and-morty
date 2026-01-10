import type { TFilters } from '@types';

export const getQueryParams = (filters: TFilters): Record<string, string> =>
  (Object.entries(filters) as [keyof TFilters, string | null][]).reduce<
    Record<string, string>
  >((acc, [key, value]) => {
    if (value) {
      acc[key] = value;
    }
    return acc;
  }, {});
