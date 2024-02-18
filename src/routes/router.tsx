import { createBrowserRouter } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'

import Root from './Root/Root'
import ErrorPage from './ErrorPage/ErrorPage'
import Tasks from './Tasks/Tasks'
import Todo from './Todos/Todos'
import Login from './LoginPage/Login'
import SignUp from './SignUpPage/SignUp'

const routes: Array<Object> = [
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/signin',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/todo',
        element: (
          <PrivateRoute>
            <Todo />
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
