import { LABELS } from '@constants';

export const Footer = () => {
  return (
    <footer className='w-full h-15 bg-gray-100 flex justify-center items-center'>
      <p>{LABELS.credentials}</p>
    </footer>
  );
};
