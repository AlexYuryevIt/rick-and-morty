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
  size?: 'sm' | 'xl';
  placeholder?: string;
  hasClearButton?: boolean;
  clearButtonSize?: 'sm' | 'md';
  clearButtonVariant?: 'plain' | 'bordered';
  onSelect: (value: T | null) => void;
  OptionComponent?: ComponentType<TDefaultOptionComponentProps<T>>;
};
