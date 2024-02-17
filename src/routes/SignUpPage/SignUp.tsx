import React, { useState, useContext, ChangeEvent } from 'react'
import { authSignUp } from '../../firebase/authSignUp'
import Button from '../../components/Button/Button'
import InputText from '../../components/Input/Input'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'

import './SignUp.scss'

import { UserContext } from '../../context/userContext'

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const nav = useNavigate()

  const { setUserEmail, setUserID } = useContext(UserContext)

  const handleFormSubmit = (): void => {
    setError('')

    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (password.length < 6) {
      setError('Password should be at least 6 characters long.')
      return
    }

    authSignUp(email, password)
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
        <h1>SIGN UP</h1>
        <InputText
          id="image___lock"
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
        <InputText
          type="password"
          icon={faLock}
          placeholder="Confirm Password"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setConfirmPassword(e.target.value)
          }
        />
        {error && <p className="error">{error}</p>}
        <Link to="/" className="text__login">
          Already a member?
        </Link>
        <Button
          variant="primary"
          label="SIGN UP"
          handleClick={handleFormSubmit}
        />
      </div>
    </div>
  )
}

export default Signup
