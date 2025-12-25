import { useState, type ReactNode } from 'react';

import { ArrowDown, ArrowUp } from '@assets';

type TSelectorProps = {
  options: string[];
  size?: 'big' | 'small';
  placeholder?: string;
  value: string | undefined;
  status?: ReactNode[];
  onSelect: (value: string) => void;
  renderStatusIcon?: (status: string) => ReactNode;
};

const selectorSizes = {
  big: {
    button: 'w-60 h-15 py-4 px-2 ',
    menu: 'w-60 top-17',
    option: 'h-10 py-4 px-2'
  },
  small: {
    button: 'w-23.5 h-5.25 py-0.5 px-1 text-sm',
    menu: 'w-23.5 top-6',
    option: 'w-23.5 py-0.5 px-1 text-sm'
  }
} as const;

export const Selector = ({
  options,
  size = 'big',
  placeholder = 'Select value',
  value,
  onSelect,
  renderStatusIcon
}: TSelectorProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const hasValue = value !== '' && value !== undefined;
  const buttonText = hasValue ? value : placeholder;
  const selectorStyles = selectorSizes[size];

  const handleShowOptions = () => setShowOptions((prev) => !prev);

  const handleSelectValue = (val: string) => {
    if (val === value) {
      onSelect('');
      return setShowOptions(false);
    }

    onSelect(val || '');
    return setShowOptions(false);
  };

  return (
    <div className='relative'>
      <button
        className={`${selectorStyles.button} border border-[#393939] rounded-md text-black/60 text-left flex items-center justify-between `}
        onClick={handleShowOptions}
      >
        <div className='w-full flex gap-1 items-center'>
          <p className='leading-none m-0'>{buttonText}</p>
          {hasValue && renderStatusIcon && renderStatusIcon(value)}
        </div>
        {showOptions ? (
          <ArrowUp width={size === 'big' ? '10px' : '4px'} />
        ) : (
          <ArrowDown width={size === 'big' ? '10px' : '4px'} />
        )}
      </button>
      {showOptions && (
        <div
          className={`${selectorStyles.menu} absolute left-0 flex flex-col justify-center bg-white border border-[#393939] rounded-md z-1000`}
        >
          {options.map((opt) => (
            <div
              key={opt}
              className={`${selectorStyles.option} flex items-center gap-1 text-left cursor-default text-black/60 hover:text-black`}
              onClick={() => handleSelectValue(opt)}
            >
              <span>{opt}</span>
              {renderStatusIcon && renderStatusIcon(opt)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
