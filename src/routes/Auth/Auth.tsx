import React, { useState, useContext, ChangeEvent } from 'react'
import { authSignIn } from '../../firebase/authSignIn'
import Button from '../../components/Button/Button'
import InputText from '../../components/Input/Input'
import { authSignOut } from '../../firebase/authSignOut'
import { useNavigate } from 'react-router-dom'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'

import './Auth.scss'

import { UserContext } from '../../context/userContext'

const Auth: React.FC = () => {
  const [showSignup, setShowSignup] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const nav = useNavigate()

  const { setUserEmail, setUserID } = useContext(UserContext)

  const handleAlreadyMemberClick = (): void => {
    setShowSignup(!showSignup)
  }

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

    if (showSignup) {
      authSignIn(email, password)
        .then((user) => {
          setUserEmail(user.email)
          setUserID(user.uid)
          nav('/todo')
        })
        .catch((error) => {
          console.error(error)
        })
    } else {
      authSignOut(email, password)
        .then((user) => {
          setUserEmail(user.email)
          setUserID(user.uid)
          nav('/todo')
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }

  return (
    <div className="mainContainer">
      <div className="containerTitle">
        <h1 className="titleAuth">CHECK-IT-OUT</h1>
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
        <h1>{showSignup ? 'LOGIN' : 'USER SIGN UP'}</h1>
        <InputText
          type="text"
          icon={faUser}
          placeholder="Email"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <InputText
          type="password"
          icon={faLock}
          placeholder="Password"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        {error && <p className="error">{error}</p>}
        <p className="text-login" onClick={handleAlreadyMemberClick}>
          {showSignup ? 'Not a member yet?' : 'Already a member?'}
        </p>
        <Button
          variant="primary"
          label={showSignup ? 'LOGIN' : 'SIGN UP'}
          handleClick={handleFormSubmit}
        />
      </div>
    </div>
  )
}

export default Auth
