import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';

import { AppHeader, ErrorBoundary, Footer } from '@components';
import { ErrorPage } from '@pages';

export const MainLayout = () => {
  return (
    <div className='min-h-screen flex flex-col bg-slate-50'>
      <AppHeader />
      <main className='flex-1 w-full py-6.5'>
        <div className='max-w-7xl mx-auto px-4'>
          <ErrorBoundary fallback={<ErrorPage />}>
            <Outlet />
          </ErrorBoundary>
          <ToastContainer />
        </div>
      </main>
      <Footer />
    </div>
  );
};
