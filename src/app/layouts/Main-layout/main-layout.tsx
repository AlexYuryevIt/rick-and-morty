import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';

import { AppHeader, Footer } from '@components';

export const MainLayout = () => {
  return (
    <div className='min-h-screen flex flex-col bg-slate-50'>
      <AppHeader />
      <main className='flex-1 w-full pt-6.5'>
        <div className='max-w-7xl mx-auto px-4'>
          <Outlet />
          <ToastContainer />
        </div>
      </main>
      <Footer />
    </div>
  );
};
