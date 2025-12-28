import type { ChangeEvent, ReactNode } from 'react';

export type TInputProps = {
  value: string;
  placeholder?: string;
  size?: 'small' | 'big';
  icon?: ReactNode;
  styles?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClear?: (value: string) => void;
};
