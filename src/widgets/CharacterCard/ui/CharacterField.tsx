import type { ReactNode } from 'react';

type TCharacterFieldProps = {
  label: string;
  children: ReactNode;
};

export const CharacterField = ({ label, children }: TCharacterFieldProps) => (
  <div className='flex flex-col items-start'>
    <p className='text-base font-medium text-[#3F3F3F]'>{label}</p>
    <p className='text-black/60 text-sm'>{children}</p>
  </div>
);
