import { createRoot } from 'react-dom/client';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

// Import the generated route tree
import { routeTree } from './routing/routeTree.js';

// Create a new router instance
const router = createRouter({ routeTree });

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <TanStackRouterDevtools router={router} />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
