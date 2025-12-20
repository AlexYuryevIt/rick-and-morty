import { MainLayout } from '@layouts';
import { HomePage } from '@pages';
import { createBrowserRouter } from 'react-router';

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
