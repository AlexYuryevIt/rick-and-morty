import { create } from 'zustand';

import type { TCharacter } from '@types';

export type TCharacterStore = {
  character: TCharacter | null;
  setCharacter: (character: TCharacter | null) => void;
};

export const useCharacterStore = create<TCharacterStore>()((set) => ({
  character: null,
  setCharacter: (character: TCharacter | null) => set({ character })
}));
