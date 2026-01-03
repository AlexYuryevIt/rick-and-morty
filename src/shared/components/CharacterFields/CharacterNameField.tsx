import { Link } from 'react-router';

import { Input } from '@components';

import type { ChangeEvent } from 'react';

type TCharacterNameField = {
  name: string;
  characterLink: string;
  isEditing: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClear: (value: string) => void;
};

export const CharacterNameField = ({
  name,
  characterLink,
  isEditing,
  onChange,
  onClear
}: TCharacterNameField) => {
  return (
    <div className='flex gap-4 justify-between items-center'>
      {isEditing ? (
        <Input
          value={name}
          onChange={onChange}
          onClear={onClear}
        />
      ) : (
        <Link to={characterLink}>
          <p>{name}</p>
        </Link>
      )}
    </div>
  );
};
