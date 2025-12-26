import type { ReactNode } from 'react';

type TIconButtonProps = {
  children: ReactNode | 'string';
  size?: 'sm' | 'md';
  variant?: 'plain' | 'bordered';
  className?: string;
  onClick: () => void;
};

const defaultButtonStyles = {
  plain: 'flex justify-center items-center cursor-pointer',
  bordered: 'flex justify-center items-center border rounded-lg cursor-pointer'
};

const defaultButtonSizes = {
  sm: 'w-2 h-2',
  md: 'w-9.5 h-9.5'
};

export const IconButton = ({
  children,
  size = 'md',
  variant = 'bordered',
  className,
  onClick
}: TIconButtonProps) => {
  const styles = defaultButtonStyles[variant];
  const buttonSize = defaultButtonSizes[size];

  return (
    <button
      className={`${styles} ${buttonSize} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
