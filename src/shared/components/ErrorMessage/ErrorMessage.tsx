import { LABELS } from '@constants';

import styles from './ErrorMessage.module.scss';

import type { TErrorMessage } from './types';

export const ErrorMessage = ({ message, refetch, onGoBack }: TErrorMessage) => {
  return (
    <div className={styles.error__wrapper}>
      <p>{message}</p>
      {refetch && (
        <button
          onClick={refetch}
          type='button'
          className={styles.error__button}
        >
          {LABELS.RETRY}
        </button>
      )}
      {onGoBack && (
        <button
          onClick={onGoBack}
          type='button'
          className={styles.error__button}
        >
          {LABELS.GO_TO_MAIN_PAGE}
        </button>
      )}
    </div>
  );
};
