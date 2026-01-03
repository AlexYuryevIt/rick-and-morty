import { classNames } from '@helpers';

import type { ReactNode } from 'react';

type TCharacterFieldProps = {
  label: string;
  children: ReactNode;
  style?: string;
  bordered?: boolean;
};

export const CharacterField = ({
  label,
  children,
  style,
  bordered = false
}: TCharacterFieldProps) => (
  <div
    className={classNames(
      'flex flex-col items-start',
      bordered && 'border-b border-gray-300',
      style
    )}
  >
    <p className='text-base font-medium text-[#3F3F3F]'>{label}</p>
    <p className='text-black/60 text-sm'>{children}</p>
  </div>
);
