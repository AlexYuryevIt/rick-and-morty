import { useState, type ChangeEvent } from 'react';

import { Checkmark, Close, Edit } from '@assets';
import {
  CharacterField,
  CharacterNameField,
  CharacterStatusField,
  IconButton
} from '@components';
import { type Status, type TCharacter } from '@types';

export type TCharacterCardProps = {
  character: TCharacter;
  onSave: (character: TCharacter) => void;
};

export const CharacterCard = ({ character, onSave }: TCharacterCardProps) => {
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

  const handleConfirmEdit = () => {
    onSave(editedCharacter);
    setIsEditing(false);
  };

  return (
    <div className='relative flex gap-3 p-1.5 rounded-md shadow w-127 max-h-62 items-start group'>
      <img
        src={character.image}
        className='w-60 h-58.5 rounded-md'
        alt='character photo'
      />

      <div className='w-full flex flex-col gap-2'>
        <CharacterNameField
          name={isEditing ? editedCharacter.name : character.name}
          characterLink={`/character/${character.id}`}
          isEditing={isEditing}
          onChange={handleEditName}
          onClear={handleClearName}
        />

        <CharacterField label='Gender'>{character.gender}</CharacterField>
        <CharacterField label='Species'>{character.species}</CharacterField>
        <CharacterField label='Location'>
          {character.location.name}
        </CharacterField>

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
          className='absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-100'
        >
          <Edit />
        </IconButton>
      )}

      {isEditing && (
        <div className='absolute top-2 right-2 flex items-center'>
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
