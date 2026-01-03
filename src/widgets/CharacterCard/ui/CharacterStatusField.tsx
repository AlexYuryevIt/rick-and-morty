import { Selector, StatusDot } from '@components';
import { statusOptions } from '@constants';

import { getCharacterStatus } from '../utils/get-status';

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
  <div>
    <p>{label}</p>
    {isEditing ? (
      <Selector
        options={statusOptions}
        size='small'
        value={characterStatus?.toLowerCase() as Status}
        onSelect={onSelect}
        clearButtonSize='small'
        OptionComponent={({ option }) => (
          <div className='flex gap-1 items-center'>
            <p>{option.label}</p>
            <StatusDot status={option.value} />
          </div>
        )}
      />
    ) : (
      <div className='flex items-center gap-1'>
        <p className='text-black/60 text-sm'>
          {getCharacterStatus(characterStatus)}
        </p>
        <StatusDot status={characterStatus} />
      </div>
    )}
  </div>
);
