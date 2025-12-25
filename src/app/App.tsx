import { RouterProvider } from 'react-router';

import { router } from '@router';

import './App.css';

export const App = () => {
  return <RouterProvider router={router} />;
};
