import { useTranslation } from 'react-i18next';

import { Crash } from '@assets';

import styles from './ErrorPage.module.scss';

export const ErrorPage = () => {
  const { t } = useTranslation('errors');

  return (
    <div className={styles.error__wrapper}>
      <img
        src={Crash}
        width={600}
        height={400}
        alt='crashed ship'
      />
      <p className={styles.error__text}>{t('ui:unexpected')}</p>
    </div>
  );
};
