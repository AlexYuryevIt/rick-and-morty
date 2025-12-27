import { useId, type ChangeEvent, type ReactNode } from 'react';

import { Close } from '@assets';

import { IconButton } from '../IconButton/IconButton';

type TInputProps = {
  value: string;
  placeholder?: string;
  size?: 'small' | 'big';
  icon?: ReactNode;
  styles?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClear?: (value: string) => void;
};

const inputSizes = {
  small: 'h-7.5 w-45 border-b px-0 text-xl',
  big: 'h-14 w-60 border rounded-md p-4'
};

export const Input = ({
  value,
  placeholder,
  size = 'small',
  icon,
  styles,
  onChange,
  onClear
}: TInputProps) => {
  const handleClearValue = () => {
    onClear?.('');
  };

  const isBigSize = size === 'big';

  return (
    <div className='relative'>
      <input
        value={value}
        placeholder={placeholder}
        className={`${inputSizes[size]} ${icon && 'pl-10'} ${value && isBigSize && 'pr-10'} outline-0 placeholder:text-gray-500 ${styles ?? ''}`}
        onChange={onChange}
        type='text'
        id={useId()}
      />
      {value && isBigSize && (
        <IconButton
          variant='plain'
          size='small'
          onClick={handleClearValue}
          className='absolute top-[50%] translate-y-[-50%] right-4'
        >
          <Close
            width={'16px'}
            height={'16px'}
          />
        </IconButton>
      )}
      {icon && (
        <div className='absolute top-[50%] translate-y-[-50%] left-4'>
          {icon}
        </div>
      )}
    </div>
  );
};
