import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { RouterProvider } from 'react-router';

import { router } from '@router';

import './App.css';

const queryClient = new QueryClient();

const asyncStoragePersister = createAsyncStoragePersister({
  storage: window.localStorage
});

export const App = () => {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: asyncStoragePersister }}
    >
      <RouterProvider router={router} />
    </PersistQueryClientProvider>
  );
};
