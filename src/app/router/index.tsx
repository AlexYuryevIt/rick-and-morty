import { createBrowserRouter } from 'react-router';

import { MainLayout } from '@layouts';
import { CharacterPage, HomePage, NotFoundPage } from '@pages';

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: '/character/:id',
        element: <CharacterPage />
      },
      {
        path: '*',
        element: <NotFoundPage />
      }
    ]
  }
]);
