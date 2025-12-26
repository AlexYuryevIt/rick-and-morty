import { useEffect, useRef, useState, type ComponentType } from 'react';

import { ArrowDown, ArrowUp, Checkmark, Close } from '@assets';

import { IconButton } from '../IconButton/IconButton';

type TOption<T> = {
  label: string;
  value: T;
};

type TDefaultOptionComponentProps<T> = {
  option: TOption<T>;
  selected?: boolean;
};

type TSelectorProps<T> = {
  options: TOption<T>[];
  value: T | null;
  size?: 'sm' | 'xl';
  placeholder?: string;
  hasClearButton?: boolean;
  clearButtonSize?: 'sm' | 'md';
  clearButtonVariant?: 'plain' | 'bordered';
  onSelect: (value: T | null) => void;
  OptionComponent?: ComponentType<TDefaultOptionComponentProps<T>>;
};

const selectorSizes = {
  sm: {
    button: 'w-23.5 h-5.25 py-0.5 px-1 text-sm',
    menu: 'w-23.5 top-6',
    option: 'w-23.5 py-0.5 px-1 text-sm'
  },
  xl: {
    button: 'w-60 h-15 py-4 px-2 ',
    menu: 'w-60 top-17',
    option: 'h-10 py-4 px-2'
  }
} as const;

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
  size = 'xl',
  placeholder = '',
  hasClearButton = false,
  clearButtonSize = 'sm',
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
      className='relative flex gap-2.5 align-middle'
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
          <ArrowUp width={size === 'xl' ? '10px' : '4px'} />
        ) : (
          <ArrowDown width={size === 'xl' ? '10px' : '4px'} />
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
