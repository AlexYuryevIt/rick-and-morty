import { Crash } from '@assets';
import { UI_ERROR } from '@constants';

export const ErrorPage = () => {
  return (
    <div className='flex flex-col w-full h-full justify-center items-center gap-4'>
      <img
        src={Crash}
        width={600}
        height={400}
        alt='crashed ship'
      />
      <p className='font-bold text-xl text-teal-500'>{UI_ERROR}</p>
    </div>
  );
};
