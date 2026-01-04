import { Link } from 'react-router';

import { NotFound } from '@assets';

export const NotFoundPage = () => {
  return (
    <div className='flex min-h-screen flex-col justify-center items-center gap-17.5'>
      <img
        src={NotFound}
        alt='not found page'
        className='w-135 h-83.25 bg-transparent'
      />
      <Link
        to='/'
        className='flex justify-center items-center w-60 h-14 border border-black/35 rounded-lg'
      >
        <p className='font-karla'>Go to main page</p>
      </Link>
    </div>
  );
};
