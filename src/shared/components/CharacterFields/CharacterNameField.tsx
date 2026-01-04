import { Link } from 'react-router';

import { Input } from '@components';
import { truncateText } from '@helpers';

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
    <div className='flex gap-4 justify-between items-center group relative'>
      {isEditing ? (
        <Input
          value={name}
          onChange={onChange}
          onClear={onClear}
        />
      ) : (
        <Link to={characterLink}>
          <p
            className='w-full truncate cursor-pointer'
            title={name}
          >
            {truncateText(name)}
          </p>
        </Link>
      )}
      <div className='absolute left-0 top-full mt-1 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible whitespace-pre-wrap max-w-xs z-50 transition-all duration-200 shadow-lg'>
        {name}
      </div>
    </div>
  );
};
