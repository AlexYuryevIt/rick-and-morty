import { classNames } from '@helpers';

import styles from './IconButton.module.scss';

import type { ReactNode } from 'react';

type TIconButtonProps = {
  children: ReactNode | string;
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
  const sizeClass = `icon_button--${size}`;
  const variantClass = `icon_button--${variant}`;

  return (
    <button
      className={classNames(
        styles.icon_button,
        styles[variantClass],
        styles[sizeClass],
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
