import React, { useContext } from 'react'
import { Link, NavigateFunction } from 'react-router-dom'

import { auth } from '../../firebase/firebase'
import { useNavigate } from 'react-router-dom'

import { UserContext } from '../../context/userContext'

import './Header.scss'

export default function Header() {
  const navigation: NavigateFunction = useNavigate()
  const { setUserEmail, setUserID } = useContext(UserContext)

  const logout = () => {
    auth
      .signOut()
      .then(() => {
        setUserEmail('null')
        setUserID('null')
        navigation('/')
      })
      .catch((error) => {
        console.error('Une erreur est survenue:', error)
      })
  }

  return (
    <header>
      <nav className="navbar">
        <p className="navbar__name">Buzz'Up</p>
        <ul className="nav__list">
          <li className="nav__item">
            <Link to="/todo">MY TODOS</Link>
          </li>
          <li className="nav__item">
            <Link to="/signIn" onClick={logout}>
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
