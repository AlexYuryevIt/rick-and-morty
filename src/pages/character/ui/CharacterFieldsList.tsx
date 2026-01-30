import { CharacterField } from '@components';

import styles from './CharacterFieldsList.module.scss';

import type { TCharacterFieldProps } from './types';

export const CharacterFieldsList = ({
  characterFields
}: TCharacterFieldProps) => {
  return (
    <div className={styles.list}>
      {characterFields.map((char) => (
        <CharacterField
          label={char.label}
          bordered
          style={styles.field}
          key={char.label}
        >
          {char.value}
        </CharacterField>
      ))}
    </div>
  );
};
