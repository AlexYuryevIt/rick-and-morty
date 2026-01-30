import { useTranslation } from 'react-i18next';

import styles from './ErrorMessage.module.scss';

import type { TErrorMessage } from './types';

export const ErrorMessage = ({ message, refetch, onGoBack }: TErrorMessage) => {
  const { t } = useTranslation(['common', 'errors']);

  const errorMessage = t(`errors:api.${message}`) ?? t('errors:api.unexpected');

  return (
    <div className={styles.error__wrapper}>
      <p>{errorMessage}</p>
      {refetch && (
        <button
          onClick={refetch}
          type='button'
          className={styles.error__button}
        >
          {t('retry')}
        </button>
      )}
      {onGoBack && (
        <button
          onClick={onGoBack}
          type='button'
          className={styles.error__button}
        >
          {t('backToMainPage')}
        </button>
      )}
    </div>
  );
};
