import { HomePage } from '@pages';
import type { RouteObject } from 'react-router';

import { MainLayout } from '@layouts';
import { paths } from '../paths';

export const publicRoutes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      {
        path: paths.home,
        element: <HomePage />
      }
    ]
  }
];
