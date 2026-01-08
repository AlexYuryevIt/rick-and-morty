import type { TCharacter } from '@types';

export type TCharacterCardProps = {
  character: TCharacter;
  onSave: (character: TCharacter) => void;
};
