import { useState, type ChangeEvent } from 'react';

import { Checkmark, Close, Edit } from '@assets';
import { IconButton } from '@components';
import { type Status, type TCharacter } from '@types';

import { CharacterField } from './ui/CharacterField';
import { CharacterStatusField } from './ui/CharacterStatusField';
import { CharacterNameField } from './ui/CharcterNameField';

export type TCharacterCardProps = {
  character: TCharacter;
};

export const CharacterCard = ({ character }: TCharacterCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCharacter, setEditedCharacter] = useState<TCharacter>(character);

  const handleEditCard = () => setIsEditing((prev) => !prev);

  const handleEditName = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: name } = e.target;

    setEditedCharacter((prev) => ({ ...prev, name }));
  };

  const handleEditStatus = (status: Status) => {
    setEditedCharacter((prev) => ({ ...prev, status }));
  };

  const handleClearName = (name: string) => {
    setEditedCharacter((prev) => ({ ...prev, name }));
  };

  const handleCancelEdit = () => {
    setEditedCharacter(character);
    setIsEditing(false);
  };
  const handleConfirmEdit = () => setIsEditing(false);

  return (
    <div className='flex gap-3 p-1.5 rounded-md shadow w-127 max-h-62 items-start group'>
      <img
        src={character.photo}
        className='w-60 h-58.5 rounded-md'
      />

      <div className='w-full flex flex-col gap-2'>
        <CharacterNameField
          name={isEditing ? editedCharacter.name : character.name}
          isEditing={isEditing}
          onChange={handleEditName}
          onClear={handleClearName}
        />

        <CharacterField label='Gender'>{character.gender}</CharacterField>
        <CharacterField label='Species'>{character.location}</CharacterField>
        <CharacterField label='Location'>{character.species}</CharacterField>

        <CharacterStatusField
          label='Status'
          characterStatus={
            isEditing ? editedCharacter.status : character.status
          }
          isEditing={isEditing}
          onSelect={handleEditStatus}
        />
      </div>

      {!isEditing && (
        <IconButton
          onClick={handleEditCard}
          variant='plain'
          className='opacity-0 group-hover:opacity-100 transition-all duration-100'
        >
          <Edit />
        </IconButton>
      )}

      {isEditing && (
        <div className='flex items-center'>
          <IconButton
            variant='plain'
            onClick={handleCancelEdit}
            className='w-6 h-6'
          >
            <Close />
          </IconButton>
          <IconButton
            variant='plain'
            onClick={handleConfirmEdit}
            className='w-6 h-6'
          >
            <Checkmark />
          </IconButton>
        </div>
      )}
    </div>
  );
};
