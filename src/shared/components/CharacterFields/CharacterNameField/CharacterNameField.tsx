import { Link } from 'react-router';

import { Input } from '@components';
import { truncateText } from '@helpers';

import styles from './CharacterNameField.module.scss';

import type { ChangeEvent } from 'react';

type TCharacterNameField = {
  name: string;
  characterLink: string;
  isEditing: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClear: (value: string) => void;
};

const maxNameLength = 25;

export const CharacterNameField = ({
  name,
  characterLink,
  isEditing,
  onChange,
  onClear
}: TCharacterNameField) => (
  <div className={styles.name_field__wrapper}>
    {isEditing ? (
      <Input
        value={name}
        onChange={onChange}
        onClear={onClear}
      />
    ) : (
      <Link to={characterLink}>
        <p
          className={styles.name_field__text}
          title={name}
        >
          {truncateText(name)}
        </p>
      </Link>
    )}
    {name.length > maxNameLength && (
      <div className={styles.name_field__tooltip}>{name}</div>
    )}
  </div>
);
