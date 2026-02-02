import { Link } from 'react-router';

import { Close } from '@assets';

import { IconButton } from '../../../IconButton/IconButton';

import styles from './FavouritesList.module.scss';

import type { TFavouritesListProps } from './types';

export const FavouritesList = ({
  favourites,
  onDelete
}: TFavouritesListProps) => {
  return (
    <div className={styles.favourites__list}>
      {favourites.length > 0 &&
        favourites.map((character) => (
          <div
            className={styles.favourites__item}
            key={character.id}
          >
            <Link
              to={`/character/${character.id}`}
              className={styles.favourites__link}
            >
              {character.name}
            </Link>
            <IconButton
              onClick={() => onDelete(character.id)}
              variant='plain'
              className={styles.favourites__btn_delete}
            >
              <Close />
            </IconButton>
          </div>
        ))}
      {favourites.length === 0 && <div>No favourites yet</div>}
    </div>
  );
};
