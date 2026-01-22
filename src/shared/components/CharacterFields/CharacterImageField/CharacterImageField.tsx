import styles from './CharacterImageField.module.scss';

type CharacterImageVariant = 'card' | 'profile';

type CharacterImageProps = {
  src?: string;
  alt?: string;
  variant?: CharacterImageVariant;
  className?: string;
};

const variantClasses: Record<CharacterImageVariant, string> = {
  card: styles['character_image--card'],
  profile: styles['character_image--profile']
};

export const CharacterImageField = ({
  src,
  alt,
  variant = 'card',
  className = ''
}: CharacterImageProps) => {
  const baseClass = `${styles.character_image} ${variantClasses[variant]} ${className}`;

  return (
    <img
      src={src}
      alt={alt || ''}
      className={baseClass}
    />
  );
};
