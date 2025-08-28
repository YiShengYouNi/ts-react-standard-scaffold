import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { env } from '@/config/env';
import { router } from '@/routes';
import '@/styles/global.css';

async function enableMockIfNeeded() {
  if (import.meta.env.DEV && env.ENABLE_MOCK) {
    const { worker } = await import('@/mocks/browser');
    await worker.start({ onUnhandledRequest: 'warn' });
    // eslint-disable-next-line no-console
    console.info('[msw] mock worker started');
  }
}

const bootstrap = async () => {
  await enableMockIfNeeded();

  const queryClient = new QueryClient();

  const rootElement = document.getElementById('root') as HTMLElement;

  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </React.StrictMode>,
  );
};

void bootstrap();
