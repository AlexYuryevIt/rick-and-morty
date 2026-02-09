import type { TFavouriteCharacter } from '@types';

export type TFavouritesListProps = {
  favourites: TFavouriteCharacter[];
  onDelete: (id: number | string) => void;
};
