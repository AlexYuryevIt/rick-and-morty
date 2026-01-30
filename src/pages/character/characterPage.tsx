import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { ArrowLeft } from '@assets';
import { CharacterImageField, IconButton, Loader } from '@components';
import { CHARACTER_PAGE_LABELS, NOTIFICATION_TYPE } from '@constants';
import { notify } from '@helpers';
import { useGetCharacter } from '@hooks';
import { useCharacterStore } from '@stores';

import styles from './CharacterPage.module.scss';
import { CharacterFieldsList } from './ui/CharacterFieldsList';

export const CharacterPage = () => {
  const navigate = useNavigate();
  const { id: characterId } = useParams();
  const { t } = useTranslation(['common', 'character']);

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
      { label: t('labels.gender'), value: character?.gender },
      { label: t('labels.status'), value: character?.status },
      { label: t('labels.species'), value: character?.species },
      { label: t('labels.origin'), value: character?.origin?.name },
      {
        label: t('labels.type'),
        value: character?.type || 'Unknown'
      },
      {
        label: t('labels.location'),
        value: character?.location?.name
      }
    ],
    [character, t]
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
        <p>{t('character:goBack')}</p>
      </IconButton>

      <div>
        {isLoading && <Loader />}

        {!character && !isLoading && (
          <div className={styles.not__found_text}>
            {t('character:characterNotFound')}
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

            <h2 className={styles.subheader}>{t('character:infoLabel')}</h2>

            <CharacterFieldsList characterFields={characterFields} />
          </>
        )}
      </div>
    </div>
  );
};
