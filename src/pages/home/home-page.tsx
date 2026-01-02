import { banner } from '@assets';
import { ErrorMessage, Loader } from '@components';
import { UNEXPECTED_ERROR } from '@constants';
import { useGetCharacters } from '@hooks';
import { CharacterCard, CharacterFilters } from '@widgets';

export const HomePage = () => {
  const { characters, isLoading, isError, refetch } = useGetCharacters();

  return (
    <div className='flex flex-col justify-center items-center'>
      <img src={banner} />

      {isError && (
        <ErrorMessage
          message={UNEXPECTED_ERROR}
          refetch={refetch}
        />
      )}

      {isLoading && (
        <div>
          <Loader />
        </div>
      )}

      {characters.length > 0 && (
        <div className='flex flex-col gap-7 items-start'>
          <CharacterFilters />

          <div className='flex flex-wrap gap-7'>
            {characters &&
              characters.map((char) => (
                <CharacterCard
                  character={char}
                  key={char.id}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
