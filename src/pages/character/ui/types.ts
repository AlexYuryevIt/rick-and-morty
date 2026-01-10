import type { Status } from '@types';

type TCharacterFields = {
  value?: string | Status;
  label: string;
};

export type TCharacterFieldProps = {
  characterFields: TCharacterFields[];
};
