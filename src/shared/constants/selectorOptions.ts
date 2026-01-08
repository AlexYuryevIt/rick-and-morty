import type { TGenderOptions, TSpeciesOptions, TStatusOptions } from '@types';

export const speciesOptions: TSpeciesOptions[] = [
  { value: 'alien', label: 'Alien' },
  { value: 'animal', label: 'Animal' },
  { value: 'human', label: 'Human' },
  { value: 'humanoid', label: 'Humanoid' },
  { value: 'robot', label: 'Robot' },
  { value: 'cronenberg', label: 'Cronenberg' },
  { value: 'disease', label: 'Disease' },
  { value: 'unknown', label: 'Unknown' }
];

export const statusOptions: TStatusOptions[] = [
  { value: 'alive', label: 'Alive' },
  { value: 'dead', label: 'Dead' },
  { value: 'unknown', label: 'Unknown' }
];

export const genderOptions: TGenderOptions[] = [
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
  { value: 'genderless', label: 'Genderless' },
  { value: 'unknown', label: 'Unknown' }
];
