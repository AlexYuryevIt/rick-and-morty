import type { Status } from '@types';

type TLocation = {
  name: string;
  url: string;
};

export type TCharacter = {
  id: string;
  name: string;
  status: Status;
  species: string;
  type: string;
  gender: string;
  origin: TLocation;
  location: TLocation;
  image?: string;
  episode: string[];
  url: string;
  created: string;
};
