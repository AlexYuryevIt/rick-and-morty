import { classNames } from '@helpers';

type CharacterImageVariant = 'card' | 'profile';

type CharacterImageProps = {
  src?: string;
  alt?: string;
  variant?: CharacterImageVariant;
  className?: string;
};

const variantClasses: Record<CharacterImageVariant, string> = {
  card: 'min-w-60 min-h-58.5 w-60 h-58.5 rounded-md',
  profile: 'rounded-full w-75 h-75 border-2 border-gray-300'
};

export const CharacterImageField = ({
  src,
  alt,
  variant = 'card',
  className
}: CharacterImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      className={classNames(variantClasses[variant], className)}
    />
  );
};
