import { useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';

import { ArrowLeft } from '@assets';
import { CharacterField, Loader } from '@components';
import { CHARACTER_PAGE_LABELS } from '@constants';
import { useGetCharacter } from '@hooks';

export const CharacterPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { character, isLoading, isError, errorMessage } = useGetCharacter(
    Number(id)
  );

  const characterFields = useMemo(
    () => [
      { label: 'Gender', value: character?.gender },
      { label: 'Status', value: character?.status },
      { label: 'Species', value: character?.species },
      { label: 'Origin', value: character?.origin?.name },
      { label: 'Type', value: character?.type || 'Unknown' },
      { label: 'Location', value: character?.location?.name }
    ],
    [character]
  );

  const handleGoBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <div className='flex items-center justify-center relative'>
      <button
        onClick={handleGoBack}
        className='absolute top-7 left-0 flex justify-between items-center gap-2'
      >
        <ArrowLeft />
        <p>{CHARACTER_PAGE_LABELS.GO_BACK_BUTTON}</p>
      </button>

      <div>
        {isLoading && <Loader />}

        {isError && errorMessage}

        {character && (
          <>
            <img
              src={character?.image}
              className='rounded-full w-75 h-75 border-2 border-gray-300'
              alt='character photo'
            />

            <h1 className='mb-10.5 text-center'>{character?.name}</h1>

            <h2 className='mb-6 text-center text-gray-500'>
              {CHARACTER_PAGE_LABELS.SUB_HEADER}
            </h2>

            <div className='flex flex-col w-full'>
              {characterFields.map((char) => (
                <CharacterField
                  label={char.label}
                  bordered
                  style='py-2.5'
                >
                  {char.value}
                </CharacterField>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
