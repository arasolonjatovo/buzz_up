import { createBrowserRouter } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'

import Root from './Root/Root'
import ErrorPage from './ErrorPage/ErrorPage'
import Auth from './Auth/Auth'
import Tasks from './Tasks/Tasks'
import Todos from './Todos/Todos'
import Login from './LoginPage/Login'
import SignUp from './SignUpPage/SignUp'

const routes : Array<Object> = [
  {
    path: '/',
    element: <Login />,
  },
  {
    path:'/signUp',
    element: <SignUp/>,
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
