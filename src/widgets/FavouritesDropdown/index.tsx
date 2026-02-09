import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Star } from '@assets';
import { Badge, IconButton } from '@components';
import { NOTIFICATION_TYPE } from '@constants';
import { notify } from '@helpers';
import { useCharactersStore } from '@stores';

import styles from './styles.module.scss';
import { FavouritesList } from './ui/FavouritesList';

export const FavouritesDropdown = () => {
  const [showFavourites, setShowFavourites] = useState(false);
  const { favourites, setFavourites } = useCharactersStore();
  const { t } = useTranslation();

  const handleShowFavourites = () => {
    setShowFavourites((prev) => !prev);
  };

  const handleRemoveFavourite = (id: string | number) => {
    setFavourites(favourites.filter((item) => item.id !== id));

    return notify(
      t('notifications:removedFromFavourites'),
      NOTIFICATION_TYPE.success
    );
  };

  return (
    <div className={styles.favourites}>
      <div className={styles.favourites__btn}>
        <IconButton
          onClick={handleShowFavourites}
          size='big'
        >
          <span className={styles.favourites__button}>
            <Star color={'var(--color-accent)'} />
            {favourites.length > 0 && <Badge count={favourites.length} />}
          </span>
        </IconButton>
      </div>
      {showFavourites && (
        <FavouritesList
          favourites={favourites}
          onDelete={handleRemoveFavourite}
        />
      )}
    </div>
  );
};
