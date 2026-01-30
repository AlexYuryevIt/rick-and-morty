import { useId } from 'react';

import { Close } from '@assets';
import { IconButton } from '@components';
import { classNames } from '@helpers';

import styles from './Input.module.scss';

import type { TInputProps } from './types';

const inputSizeClasses = {
  small: styles.inputSmall,
  big: styles.inputBig
} as const;

export const Input = ({
  value,
  placeholder,
  size = 'small',
  icon,
  styles: customStyles,
  onChange,
  onClear
}: TInputProps) => {
  const handleClearValue = () => {
    onClear?.('');
  };

  return (
    <div className={styles.inputContainer}>
      <input
        value={value}
        placeholder={placeholder}
        className={classNames(
          styles.input,
          inputSizeClasses[size],
          icon && styles.hasIcon,
          value && onClear && styles.hasClearButton,
          customStyles
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
          className={styles.clearButton}
        >
          <Close
            width={'16px'}
            height={'16px'}
          />
        </IconButton>
      )}

      {icon && <div className={styles.iconWrapper}>{icon}</div>}
    </div>
  );
};
