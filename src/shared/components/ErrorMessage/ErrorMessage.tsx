import type { TErrorMessage } from './types';

export const ErrorMessage = ({
  message,
  refetch,
  onResetFilters
}: TErrorMessage) => {
  return (
    <div className='flex flex-col items-center gap-4 p-8'>
      <p>{message}</p>
      {refetch && (
        <button
          onClick={refetch}
          type='button'
          className='bg-teal-500 rounded-md p-2 w-full shadow-xl'
        >
          Попробовать еще раз
        </button>
      )}
      {onResetFilters && (
        <button
          onClick={onResetFilters}
          type='button'
          className='bg-teal-500 rounded-md p-2 w-full shadow-xl'
        >
          Сбросить фильтры
        </button>
      )}
    </div>
  );
};
