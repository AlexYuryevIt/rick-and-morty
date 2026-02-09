import { classNames } from '@helpers';

import styles from './Badge.module.scss';

import type { TBadgeProps } from './types';

const maxCountValue = 9;

export const Badge = ({ count, className }: TBadgeProps) => {
  const countValue = count > maxCountValue ? `${maxCountValue}+` : count;

  return (
    <div className={classNames(styles.badge, className)}>
      {count > 0 && <span className={styles.badge__count}>{countValue}</span>}
    </div>
  );
};
