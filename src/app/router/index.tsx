import { createBrowserRouter } from 'react-router';

import { MainLayout } from '@layouts';
import { HomePage } from '@pages';

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: '/character/:id',
        element: <div>character page</div>
      }
    ]
  }
]);
