import { LoaderBig, LoaderSmall } from '@assets';

import styles from './Loader.module.scss';

type TLoaderProps = {
  size?: 'big' | 'small';
  text?: string;
};

export const Loader = ({
  size = 'big',
  text = 'Loading characters...'
}: TLoaderProps) => {
  if (size === 'small') {
    return <LoaderSmall />;
  }

  return (
    <div className={styles.loader__wrapper}>
      <LoaderBig />
      <p className={styles.loader__text}>{text}</p>
    </div>
  );
};
