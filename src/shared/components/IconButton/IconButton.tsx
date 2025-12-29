import { classNames } from '@helpers';

import { defaultButtonSizes, defaultButtonStyles } from './IconButtonStyles';

import type { ReactNode } from 'react';

type TIconButtonProps = {
  children: ReactNode | 'string';
  size?: 'auto' | 'small' | 'big';
  variant?: 'plain' | 'bordered';
  className?: string;
  onClick: () => void;
};

export const IconButton = ({
  children,
  size = 'auto',
  variant = 'bordered',
  className,
  onClick
}: TIconButtonProps) => {
  return (
    <button
      className={classNames(
        defaultButtonStyles[variant],
        defaultButtonSizes[size],
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
