import { LoaderBig, LoaderSmall } from '@assets';

type TLoaderProps = {
  size?: 'big' | 'small';
  text?: string;
};

export const Loader = ({
  size = 'big',
  text = 'Loading characters...'
}: TLoaderProps) => {
  if (size === 'small') {
    return <LoaderSmall />;
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <LoaderBig />
      <p className='text-2xl font-karla font-bold'>{text}</p>
    </div>
  );
};
