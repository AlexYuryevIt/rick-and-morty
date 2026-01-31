import { i18n } from '@services';

import type { TGenderOptions, TSpeciesOptions, TStatusOptions } from '@types';

export const getSpeciesOptions = (): TSpeciesOptions[] => [
  { value: 'alien', label: i18n.t('filters:species.alien') },
  { value: 'animal', label: i18n.t('filters:species.animal') },
  { value: 'human', label: i18n.t('filters:species.human') },
  { value: 'humanoid', label: i18n.t('filters:species.humanoid') },
  { value: 'robot', label: i18n.t('filters:species.robot') },
  { value: 'cronenberg', label: i18n.t('filters:species.cronenberg') },
  { value: 'disease', label: i18n.t('filters:species.disease') },
  { value: 'unknown', label: i18n.t('filters:species.unknown') }
];

export const getStatusOptions = (): TStatusOptions[] => [
  { value: 'alive', label: i18n.t('filters:status.alive') },
  { value: 'dead', label: i18n.t('filters:status.dead') },
  { value: 'unknown', label: i18n.t('filters:status.unknown') }
];

export const getGenderOptions = (): TGenderOptions[] => [
  { value: 'female', label: i18n.t('filters:gender.female') },
  { value: 'male', label: i18n.t('filters:gender.male') },
  { value: 'genderless', label: i18n.t('filters:gender.genderless') },
  { value: 'unknown', label: i18n.t('filters:gender.unknown') }
];
