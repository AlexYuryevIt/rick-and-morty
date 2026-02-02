import { useEffect, useState, type ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { Checkmark, Close, Edit, Star } from '@assets';
import {
  CharacterField,
  CharacterImageField,
  CharacterNameField,
  CharacterStatusField,
  IconButton
} from '@components';
import { NOTIFICATION_TYPE, ROUTES } from '@constants';
import { notify } from '@helpers';
import { useCharactersStore } from '@stores';
import { type Status, type TCharacter } from '@types';

import styles from './CharacterCard.module.scss';

import type { TCharacterCardProps } from './types';

export const CharacterCard = ({ character, onSave }: TCharacterCardProps) => {
  const { t } = useTranslation(['common', 'notifications']);
  const { favourites, setFavourites } = useCharactersStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedCharacter, setEditedCharacter] = useState<TCharacter>(character);
  const isFavourite = favourites.some((item) => item.id === editedCharacter.id);

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

  const handleFavourite = () => {
    if (!isFavourite) {
      setFavourites([
        ...favourites,
        { id: editedCharacter.id, name: editedCharacter.name }
      ]);
      return notify(
        t('notifications:addedToFavourites'),
        NOTIFICATION_TYPE.success
      );
    }

    setFavourites(favourites.filter((item) => item.id !== editedCharacter.id));
    notify(t('notifications:removedFromFavourites'), NOTIFICATION_TYPE.success);
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

        <CharacterField label={t('labels.gender')}>
          {character.gender}
        </CharacterField>
        <CharacterField label={t('labels.species')}>
          {character.species}
        </CharacterField>
        <CharacterField label={t('labels.location')}>
          {character.location.name}
        </CharacterField>

        <CharacterStatusField
          label={t('labels.status')}
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

      <IconButton
        className={styles.favourite__button}
        onClick={handleFavourite}
        variant='plain'
      >
        <Star
          color={isFavourite ? 'var(--color-accent)' : 'transparent'}
          stroke={isFavourite ? 'transparent' : 'var(--color-accent)'}
          strokeWidth={isFavourite ? 0 : '1px'}
        />
      </IconButton>
    </div>
  );
};
