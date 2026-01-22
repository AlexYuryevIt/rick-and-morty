import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';

import { AppHeader, ErrorBoundary, Footer } from '@components';
import { ErrorPage } from '@pages';

import styles from './MainLayout.module.scss';

export const MainLayout = () => {
  return (
    <div className={styles.layout__wrapper}>
       <AppHeader />
       <main className={styles.main__wrapper}>
         <div className={styles.main__container}>
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
