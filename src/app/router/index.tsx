import { MainLayout } from '@layouts';
import { HomePage } from '@pages';
import { createBrowserRouter } from 'react-router';
import { paths } from './paths';

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: paths.characterPage,
        element: <div>character page</div>
      }
    ]
  }
]);
