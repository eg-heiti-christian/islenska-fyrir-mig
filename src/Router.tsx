import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Layout } from './components/Layout/Layout'
import * as Pages from './pages';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Pages.ErrorPage />,
    children: [
      {
        path: '/',
        element: <Pages.HomePage />
      },
      {
        path: '/verbs/present-tense',
        element: <Pages.VerbsPresentTensePage />,
      },
      {
        path: '/verbs/past-tense',
        element: <Pages.VerbsPastTensePage />,
      },
    ]
  },

]);

export function Router() {
  return <RouterProvider router={router} />;
}
