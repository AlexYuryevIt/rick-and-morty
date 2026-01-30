import { clsx, type ClassValue } from 'clsx';

export const classNames = (...classes: ClassValue[]): string => {
  return clsx(classes).trim().replace(/\s+/g, ' ');
};
