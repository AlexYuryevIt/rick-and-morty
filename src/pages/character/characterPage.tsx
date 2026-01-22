import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';

import { ArrowLeft } from '@assets';
import { CharacterImageField, IconButton, Loader } from '@components';
import {
  CHARACTER_FIELDS_LABELS,
  CHARACTER_PAGE_LABELS,
  NOTIFICATION_TYPE
} from '@constants';
import { notify } from '@helpers';
import { useGetCharacter } from '@hooks';
import { useCharacterStore } from '@stores';

import styles from './CharacterPage.module.scss';
import { CharacterFieldsList } from './ui/CharacterFieldsList';

export const CharacterPage = () => {
  const navigate = useNavigate();
  const { id: characterId } = useParams();

  const { isLoading, isError, errorMessage } = useGetCharacter(
    Number(characterId)
  );

  const { character } = useCharacterStore();

  useEffect(() => {
    if (isError && errorMessage) {
      notify(errorMessage, NOTIFICATION_TYPE.error);
    }
  }, [isError, errorMessage]);

  const characterFields = useMemo(
    () => [
      { label: CHARACTER_FIELDS_LABELS.GENDER, value: character?.gender },
      { label: CHARACTER_FIELDS_LABELS.STATUS, value: character?.status },
      { label: CHARACTER_FIELDS_LABELS.SPECIES, value: character?.species },
      { label: CHARACTER_FIELDS_LABELS.ORIGIN, value: character?.origin?.name },
      {
        label: CHARACTER_FIELDS_LABELS.TYPE,
        value: character?.type || 'Unknown'
      },
      {
        label: CHARACTER_FIELDS_LABELS.LOCATION,
        value: character?.location?.name
      }
    ],
    [character]
  );

  const handleGoBack = () => navigate(-1);

  return (
    <div className={styles.character__page}>
      <IconButton
        variant='plain'
        onClick={handleGoBack}
        className={styles.back__btn}
      >
        <ArrowLeft />
        <p>{CHARACTER_PAGE_LABELS.GO_BACK_BUTTON}</p>
      </IconButton>

      <div>
        {isLoading && <Loader />}

        {!character && !isLoading && (
          <div className={styles.not__found_text}>
            {CHARACTER_PAGE_LABELS.CHARACTER_NOT_FOUND}
          </div>
        )}

        {isError && errorMessage}

        {character && (
          <>
            <CharacterImageField
              src={character?.image}
              alt={character?.name}
              variant='profile'
            />

            <h1 className={styles.header}>{character?.name}</h1>

            <h2 className={styles.subheader}>
              {CHARACTER_PAGE_LABELS.SUB_HEADER}
            </h2>

            <CharacterFieldsList characterFields={characterFields} />
          </>
        )}
      </div>
    </div>
  );
};
