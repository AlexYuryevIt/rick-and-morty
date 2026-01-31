import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { NotFound } from '@assets';
import { ROUTES } from '@constants';

import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  const { t } = useTranslation('common');
  return (
    <div className={styles.wrapper}>
      <img
        src={NotFound}
        alt='not found page'
        className={styles.not__found_img}
      />
      <Link
        to={ROUTES.MAIN}
        className={styles.back__btn}
      >
        <p className={styles.back__btn_text}>{t('backToMainPage')}</p>
      </Link>
    </div>
  );
};
