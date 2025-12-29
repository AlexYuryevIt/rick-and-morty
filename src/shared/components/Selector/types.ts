import type { ComponentType } from 'react';

export type TOption<T> = {
  label: string;
  value: T;
};

export type TDefaultOptionComponentProps<T> = {
  option: TOption<T>;
  selected?: boolean;
};

export type TSelectorProps<T> = {
  options: TOption<T>[];
  value: T | null;
  size?: 'small' | 'big';
  placeholder?: string;
  hasClearButton?: boolean;
  clearButtonSize?: 'small' | 'big' | 'auto';
  clearButtonVariant?: 'plain' | 'bordered';
  onSelect: (value: T | null) => void;
  OptionComponent?: ComponentType<TDefaultOptionComponentProps<T>>;
};
