import type { Status } from '@types';

export type TSpeciesOptions = {
  value: string;
  label: string;
};

export type TGenderOptions = TSpeciesOptions;

export type TStatusOptions = {
  value: Status | null;
  label: string;
};
