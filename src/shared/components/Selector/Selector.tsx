import { useEffect, useRef, useState } from 'react';

import { ArrowDown, ArrowUp, Checkmark, Close } from '@assets';
import { classNames } from '@helpers';

import { IconButton } from '../IconButton/IconButton';

import styles from './Selector.module.scss';

import type { TDefaultOptionComponentProps, TSelectorProps } from './types';

export const DefaultOptionComponent = <T,>({
  option,
  selected
}: TDefaultOptionComponentProps<T>) => {
  return (
    <span className={styles.defaultOption}>
      <p>{option.label}</p>
      {selected && <Checkmark />}
    </span>
  );
};

export const Selector = <T,>({
  options,
  size = 'big',
  placeholder = '',
  hasClearButton = false,
  clearButtonSize = 'auto',
  clearButtonVariant = 'plain',
  value,
  onSelect,
  OptionComponent = DefaultOptionComponent
}: TSelectorProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find((option) => option.value === value);

  const handleMenuToggle = () => setIsOpen((prev) => !prev);

  const handleSelect = (newValue: T) => {
    if (newValue === value) {
      onSelect?.(null);
      return setIsOpen(false);
    }

    onSelect?.(newValue);
    return setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleClearSelection = () => {
    onSelect?.(null);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const sizeClasses = {
    small: {
      button: styles.buttonSmall,
      menu: styles.menuSmall,
      option: styles.optionSmall
    },
    big: {
      button: styles.buttonBig,
      menu: styles.menuBig,
      option: styles.optionBig
    }
  } as const;

  return (
    <div
      className={styles.selectorContainer}
      ref={selectRef}
    >
      <button
        data-testid='selector__button'
        onClick={handleMenuToggle}
        className={classNames(styles.selectorButton, sizeClasses[size].button)}
      >
        {selectedOption ? (
          <OptionComponent option={selectedOption} />
        ) : (
          <p>{placeholder}</p>
        )}
        {isOpen ? (
          <ArrowUp width={size === 'big' ? '10px' : '4px'} />
        ) : (
          <ArrowDown width={size === 'big' ? '10px' : '4px'} />
        )}
      </button>

      {hasClearButton && selectedOption && (
        <IconButton
          onClick={handleClearSelection}
          variant={clearButtonVariant}
          size={clearButtonSize}
          className={styles.clearButton}
        >
          <Close />
        </IconButton>
      )}

      {isOpen && (
        <ul className={classNames(styles.selectorMenu, sizeClasses[size].menu)}>
          {options.map((option) => {
            const isSelected = option.value === value;

            return (
              <li
                key={String(option.value)}
                onClick={() => {
                  if (option.value) {
                    handleSelect(option.value);
                  }
                }}
                className={classNames(
                  styles.selectorOption,
                  sizeClasses[size].option
                )}
              >
                <OptionComponent
                  option={option}
                  selected={isSelected}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
