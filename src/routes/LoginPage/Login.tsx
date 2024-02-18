import React, { useState, useContext, ChangeEvent } from 'react'
import { authSignIn } from '../../firebase/authSignIn'
import Button from '../../components/Button/Button'
import InputText from '../../components/Input/Input'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'

import './Login.scss'

import { UserContext } from '../../context/userContext'

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const nav = useNavigate()

  const { setUserEmail, setUserID } = useContext(UserContext)

  const handleFormSubmit = (): void => {
    setError('')

    if (!email || !password) {
      setError('Please fill in all fields.')
      return
    }

    if (password.length < 6) {
      setError('Password should be at least 6 characters long.')
      return
    }

    authSignIn(email, password)
      .then((user) => {
        setUserEmail(user.email)
        setUserID(user.uid)
        nav('/todo')
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <div className="main__container">
      <div className="container__title">
        <h1 className="title__auth">CHECK-IT-OUT</h1>
        <p>
          Notre todolist est votre meilleur allié pour vous aider à gérer votre
          temps, à rester organisé et à accomplir tout ce que vous souhaitez.
        </p>
        <p>
          Essayez-le dès aujourd'hui et découvrez comment vous pouvez
          transformer vos rêves en réalisations.
        </p>
      </div>
      <div className="container__login">
        <h1>LOGIN</h1>
        <InputText
          id="input__user"
          type="text"
          placeholder="Email"
          icon={faUser}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <InputText
          type="password"
          placeholder="password"
          icon={faLock}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        {error && <p className="error">{error}</p>}
        <Link to="/signup" className="text__login">
          Not a member yet?
        </Link>
        <Button
          variant="primary"
          label="LOGIN"
          handleClick={handleFormSubmit}
        />
      </div>
    </div>
  )
}

export default Login
