import { classNames } from '@helpers';

import styles from './Badge.module.scss';

import type { TBadgeProps } from './types';

export const Badge = ({ count, className }: TBadgeProps) => {
  return (
    <div className={classNames(styles.badge, className)}>
      {count > 0 && <span className={styles.badge__count}>{count}</span>}
    </div>
  );
};
