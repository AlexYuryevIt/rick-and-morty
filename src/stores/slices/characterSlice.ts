import { isAxiosError } from 'axios';
import { type StateCreator } from 'zustand';

import { getCharacter } from '@api';
import { UNEXPECTED_ERROR } from '@constants';
import { getErrorMessage } from '@helpers';

import type { TCharacter } from '@types';

export type TCharacterSlice = {
  character: TCharacter | null;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
  fetchCharacter: (characterId: number) => Promise<void>;
};

export const CharacterSlice: StateCreator<TCharacterSlice> = (set) => ({
  character: null,
  isLoading: false,
  isError: false,
  errorMessage: null,

  fetchCharacter: async (characterId) => {
    set({
      isLoading: true,
      isError: false,
      errorMessage: null
    });

    try {
      const char = await getCharacter(characterId);

      set({
        character: char,
        isLoading: false
      });
    } catch (error) {
      set({
        isLoading: false,
        isError: true,
        character: null,
        errorMessage: isAxiosError(error)
          ? getErrorMessage(error)
          : UNEXPECTED_ERROR
      });
    }
  }
});
