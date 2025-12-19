import { banner } from '@assets';
import { Loader } from '@components';
import { useState } from 'react';

export const HomePage = () => {
  const [isLoading, _setIsLoading] = useState(true);

  if (isLoading) {
    return (
      <div className='flex flex-col justify-center items-center'>
        <img src={banner} />
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <img src={banner} />
    </div>
  );
};
