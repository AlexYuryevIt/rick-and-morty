import { banner } from '@assets';
import { Loader } from '@components';
import { useState } from 'react';

export const HomePage = () => {
  const [isLoading, _setIsLoading] = useState(true);

  return (
    <div className='flex flex-col justify-center items-center'>
      <img src={banner} />
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div>Characters...</div>
      )}
    </div>
  );
};
