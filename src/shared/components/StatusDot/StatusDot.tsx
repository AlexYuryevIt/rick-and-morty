import { classNames } from '@helpers';

import type { Status } from '@types';

type TStatusDotProps = {
  status: Status;
};

export const StatusDot = ({ status }: TStatusDotProps) => (
  <span
    className={classNames(
      'inline-block h-2.5 w-2.5 rounded-full',
      status === 'alive' && 'bg-green-500',
      status === 'dead' && 'bg-red-500',
      status === 'unknown' && 'bg-orange-500'
    )}
  />
);
