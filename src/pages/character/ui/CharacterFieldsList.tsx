import { CharacterField } from '@components';

import type { TCharacterFieldProps } from './types';

export const CharacterFieldsList = ({
  characterFields
}: TCharacterFieldProps) => {
  return (
    <div className='flex flex-col w-full'>
      {characterFields.map((char) => (
        <CharacterField
          label={char.label}
          bordered
          style='py-2.5'
          key={char.label}
        >
          {char.value}
        </CharacterField>
      ))}
    </div>
  );
};
