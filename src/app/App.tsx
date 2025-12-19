import { RouterProvider } from 'react-router';
import './App.css';
import { router } from './router';

export const App = () => {
  return <RouterProvider router={router} />;
};
