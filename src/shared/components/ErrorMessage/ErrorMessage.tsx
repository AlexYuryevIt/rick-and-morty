import { LABELS } from '@constants';

import type { TErrorMessage } from './types';

export const ErrorMessage = ({ message, refetch, onGoBack }: TErrorMessage) => {
  return (
    <div className='flex flex-col items-center gap-4 p-8'>
      <p>{message}</p>
      {refetch && (
        <button
          onClick={refetch}
          type='button'
          className='bg-teal-500 rounded-md p-2 w-full shadow-xl cursor-pointer'
        >
          {LABELS.RETRY}
        </button>
      )}
      {onGoBack && (
        <button
          onClick={onGoBack}
          type='button'
          className='bg-teal-500 rounded-md p-2 w-full shadow-xl cursor-pointer'
        >
          {LABELS.GO_TO_MAIN_PAGE}
        </button>
      )}
    </div>
  );
};
