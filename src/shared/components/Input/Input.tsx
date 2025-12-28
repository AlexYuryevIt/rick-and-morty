import { useId } from 'react';

import { Close } from '@assets';
import { IconButton } from '@components';
import { classNames } from '@helpers';

import { inputSizes } from './InputStyles';

import type { TInputProps } from './types';

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

  return (
    <div className='relative'>
      <input
        value={value}
        placeholder={placeholder}
        className={classNames(
          inputSizes[size],
          icon && 'pl-10',
          value && onClear && 'pr-10',
          'outline-0 placeholder:text-gray-500',
          styles
        )}
        onChange={onChange}
        type='text'
        id={useId()}
      />
      {value && onClear && (
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
