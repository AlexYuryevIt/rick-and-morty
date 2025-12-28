import type { Status } from '@types';

export type TCharacter = {
  name: string;
  gender: string;
  species: string;
  location: string;
  status: Status;
  photo?: string;
};
