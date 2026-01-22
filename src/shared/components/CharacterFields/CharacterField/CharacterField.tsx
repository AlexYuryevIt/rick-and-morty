import { classNames } from '@helpers';

import styles from './CharacterField.module.scss';

import type { ReactNode } from 'react';

type TCharacterFieldProps = {
  label: string;
  children: ReactNode;
  style?: CSSImportRule | string;
  bordered?: boolean;
};

export const CharacterField = ({
  label,
  children,
  style,
  bordered = false
}: TCharacterFieldProps) => (
  <div
    className={classNames(
      styles.character__field,
      bordered && styles.border,
      style
    )}
  >
    <p className={styles.field__label}>{label ?? ''}</p>
    <p className={styles.field__text}>{children ?? ''}</p>
  </div>
);
