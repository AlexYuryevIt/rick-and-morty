import type { ReactNode } from 'react';

type TIconButtonProps = {
  children: ReactNode | 'string';
  onClick: () => void;
};

export const IconButton = ({ children, onClick }: TIconButtonProps) => {
  return (
    <button
      className='flex justify-center items-center border rounded-lg w-9.5 h-9.5 cursor-pointer'
      onClick={onClick}
    >
      {children}
    </button>
  );
};
