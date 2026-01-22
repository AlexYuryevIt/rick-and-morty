import { classNames } from '@helpers';

import styles from './StatusDot.module.scss';

import type { TStatusDotProps } from './types';

export const StatusDot = ({ status }: TStatusDotProps) => (
  <span
    className={classNames(
      styles.status__dot,
      styles[`status__dot--${status?.toLowerCase()}`]
    )}
  />
);
