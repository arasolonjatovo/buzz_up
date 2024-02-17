import React, { useState, useContext, ChangeEvent } from 'react'
import { authSignIn } from '../../firebase/authSignIn'
import Button from '../../components/Button/Button'
import InputText from '../../components/Input/Input'
import { authSignOut } from '../../firebase/authSignOut'
import { useNavigate } from 'react-router-dom'

import { UserContext } from '../../context/userContext'

const Auth: React.FC = () => {
  const myIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/></svg>`
  const myIconPass = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock" viewBox="0 0 16 16"> <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/> </svg>`
  const [showSignup, setShowSignup] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const nav = useNavigate();

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
      <div className="containerLogin">
        <h1>{showSignup ? 'LOGIN' : 'USER SIGN UP'}</h1>
        <InputText
          type="text"
          icon={myIcon}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />
        <InputText
          type="password"
          icon={myIconPass}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
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