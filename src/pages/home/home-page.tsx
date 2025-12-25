import { useState } from 'react';

import { banner } from '@assets';
import { Loader } from '@components';

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
