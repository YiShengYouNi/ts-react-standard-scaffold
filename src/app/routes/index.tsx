import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import App from '@/App';
import Home from '@/pages/home';

const About = lazy(() => import('@/pages/about'));
const TODO = lazy(() => import('@/pages/todo'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>Route not found</div>,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'about',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <About />
          </Suspense>
        ),
      },
      {
        path: 'todo',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <TODO />
          </Suspense>
        ),
      },
    ],
  },
]);
