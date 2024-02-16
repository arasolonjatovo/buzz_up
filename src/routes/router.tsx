import { createBrowserRouter } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'

import Root from './Root/Root'
import ErrorPage from './ErrorPage/ErrorPage'
import Auth from './Auth/Auth'
import Tasks from './Tasks/Tasks'
import Todos from './Todos/Todos'

const routes : Array<Object> = [
  {
    path: '/',
    element: <Auth />,
  },
  {
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/todo',
        element: (
          <PrivateRoute>
            <Todos />
          </PrivateRoute>
        ),
      },
      {
        path: '/todo/:id',
        element: (
          <PrivateRoute>
            <Tasks />
          </PrivateRoute>
        ),
      },
    ],
  },
]

export const router = createBrowserRouter(routes)
