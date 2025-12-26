import { useEffect, useRef, useState } from 'react';

import { ArrowDown, ArrowUp, Checkmark, Close } from '@assets';

import { IconButton } from '../IconButton/IconButton';

import { selectorSizes } from './SelectorStyles';

import type { TDefaultOptionComponentProps, TSelectorProps } from './types';

export const DefaultOptionComponent = <T,>({
  option,
  selected
}: TDefaultOptionComponentProps<T>) => {
  return (
    <span className='w-full flex gap-1.5 justify-between items-center'>
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
  clearButtonSize = 'small',
  clearButtonVariant = 'plain',
  value,
  onSelect,
  OptionComponent = DefaultOptionComponent
}: TSelectorProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find((option) => option.value === value);
  const selectorStyles = selectorSizes[size];

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
    onSelect(null);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div
      className='relative flex gap-2.5 items-center'
      ref={selectRef}
    >
      <button
        className={`${selectorStyles.button} border border-[#393939] rounded-md text-black/60 text-left flex items-center justify-between `}
        onClick={handleMenuToggle}
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
        >
          <Close />
        </IconButton>
      )}
      {isOpen && (
        <ul
          className={`${selectorStyles.menu} absolute left-0 flex flex-col justify-center bg-white border border-[#393939] rounded-md z-1000`}
        >
          {options.map((option) => {
            const isSelected = option.value === value;

            return (
              <li
                key={String(option.value)}
                onClick={() => handleSelect(option.value)}
                className={`${selectorStyles.option} flex items-center gap-1 text-left cursor-default text-black/60 hover:text-black`}
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
