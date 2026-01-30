import { useEffect, useState, type ChangeEvent } from 'react';

import { Checkmark, Close, Edit } from '@assets';
import {
  CharacterField,
  CharacterImageField,
  CharacterNameField,
  CharacterStatusField,
  IconButton
} from '@components';
import { CHARACTER_FIELDS_LABELS, ROUTES } from '@constants';
import { type Status, type TCharacter } from '@types';

import styles from './CharacterCard.module.scss';

import type { TCharacterCardProps } from './types';

export const CharacterCard = ({ character, onSave }: TCharacterCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCharacter, setEditedCharacter] = useState<TCharacter>(character);

  useEffect(() => {
    if (!isEditing) {
      setEditedCharacter(character);
    }
  }, [character, isEditing]);

  const handleEditCard = () => setIsEditing((prev) => !prev);

  const handleEditName = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: name } = e.target;

    setEditedCharacter((prev) => ({ ...prev, name }));
  };

  const handleEditStatus = (status: Status) => {
    setEditedCharacter((prev) => ({ ...prev, status }));
  };

  const handleClearName = () => {
    setEditedCharacter((prev) => ({ ...prev, name: '' }));
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
    <div className={styles.character__card_wrapper}>
      <CharacterImageField
        src={character?.image}
        alt={character?.name}
        variant='card'
      />
      <div className={styles.character__card_fields_wrapper}>
        <CharacterNameField
          name={isEditing ? editedCharacter.name : character.name}
          characterLink={ROUTES.CHARACTER_PAGE(character.id)}
          isEditing={isEditing}
          onChange={handleEditName}
          onClear={handleClearName}
        />

        <CharacterField label={CHARACTER_FIELDS_LABELS.GENDER}>
          {character.gender}
        </CharacterField>
        <CharacterField label={CHARACTER_FIELDS_LABELS.SPECIES}>
          {character.species}
        </CharacterField>
        <CharacterField label={CHARACTER_FIELDS_LABELS.LOCATION}>
          {character.location.name}
        </CharacterField>

        <CharacterStatusField
          label={CHARACTER_FIELDS_LABELS.STATUS}
          characterStatus={
            isEditing ? editedCharacter.status : character.status
          }
          isEditing={isEditing}
          onSelect={handleEditStatus}
        />
      </div>

      {isEditing ? (
        <div className={styles.buttons__block}>
          <IconButton
            variant='plain'
            onClick={handleCancelEdit}
            className={styles.action__button}
          >
            <Close />
          </IconButton>
          <IconButton
            variant='plain'
            onClick={handleConfirmEdit}
            className={styles.action__button}
          >
            <Checkmark />
          </IconButton>
        </div>
      ) : (
        <IconButton
          onClick={handleEditCard}
          variant='plain'
          className={styles.edit__button}
        >
          <Edit />
        </IconButton>
      )}
    </div>
  );
};
