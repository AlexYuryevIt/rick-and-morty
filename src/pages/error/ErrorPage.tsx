import { Crash } from '@assets';
import { UI_ERROR } from '@constants';

import styles from './ErrorPage.module.scss';

export const ErrorPage = () => {
  return (
    <div className={styles.error__wrapper}>
      <img
        src={Crash}
        width={600}
        height={400}
        alt='crashed ship'
      />
      <p className={styles.error__text}>{UI_ERROR}</p>
    </div>
  );
};
