import { Selector, StatusDot } from '@components';
import { statusOptions } from '@constants';

import { getCharacterStatus } from '../utils/get-status';

import styles from './CharacterStatusField.module.scss';

import type { Status } from '@types';

type TCharacterStatusFieldProps = {
  label: string;
  characterStatus: Status;
  isEditing: boolean;
  onSelect: (status: Status) => void;
};

export const CharacterStatusField = ({
  label,
  characterStatus,
  isEditing,
  onSelect
}: TCharacterStatusFieldProps) => (
  <div className={styles.field__wrapper}>
    <p className={styles.field__label}>{label}</p>
    {isEditing ? (
      <Selector
        options={statusOptions}
        size='small'
        value={characterStatus?.toLowerCase() as Status}
        onSelect={onSelect}
        clearButtonSize='small'
        OptionComponent={({ option }) => (
          <div className={styles.field__option}>
            <p>{option.label}</p>
            <StatusDot status={option.value} />
          </div>
        )}
      />
    ) : (
      <div className={styles.status__field}>
        <p className={styles.status__text}>
          {getCharacterStatus(characterStatus)}
        </p>
        <StatusDot status={characterStatus} />
      </div>
    )}
  </div>
);
