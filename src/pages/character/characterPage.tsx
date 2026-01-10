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
import { useCharactersStore } from '@stores';

import { CharacterFieldsList } from './ui/CharacterFieldsList';

export const CharacterPage = () => {
  const navigate = useNavigate();
  const { id: characterId } = useParams();

  const { character, isLoading, isError, errorMessage, fetchCharacter } =
    useCharactersStore();

  useEffect(() => {
    fetchCharacter(Number(characterId));
  }, [characterId, fetchCharacter]);

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
    <div className='flex items-center justify-center relative'>
      <IconButton
        variant='plain'
        onClick={handleGoBack}
        className='absolute top-7 left-0 flex justify-between items-center gap-2'
      >
        <ArrowLeft />
        <p>{CHARACTER_PAGE_LABELS.GO_BACK_BUTTON}</p>
      </IconButton>

      <div>
        {isLoading && <Loader />}

        {!character && !isLoading && (
          <div className='flex flex-col items-center gap-4 text-center'>
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

            <h1 className='mb-10.5 text-center'>{character?.name}</h1>

            <h2 className='mb-6 text-center text-gray-500'>
              {CHARACTER_PAGE_LABELS.SUB_HEADER}
            </h2>

            <CharacterFieldsList characterFields={characterFields} />
          </>
        )}
      </div>
    </div>
  );
};
