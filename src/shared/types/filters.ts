import type { Status } from '@types';

export type TFilters = {
  name: string;
  species: string | null;
  gender: string | null;
  status: Status;
};
