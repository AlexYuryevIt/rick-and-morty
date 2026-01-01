import { classNames } from '@helpers';

import type { Status } from '@types';

type TStatusDotProps = {
  status: Status;
};

const colorByStatus = {
  alive: 'bg-green-500',
  dead: 'bg-red-500',
  unknown: 'bg-orange-400'
};

export const StatusDot = ({ status }: TStatusDotProps) => (
  <span
    className={classNames(
      'inline-block h-2.5 w-2.5 rounded-full',
      status
        ? colorByStatus[status.toLowerCase() as keyof typeof colorByStatus]
        : ''
    )}
  />
);
