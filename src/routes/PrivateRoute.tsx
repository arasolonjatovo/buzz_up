import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/userContext'

type Props = {
  children: React.ReactNode
}

export default function PrivateRoute({ children }: Props) {
  const { userID } = useContext(UserContext)
  const navigation = useNavigate()

  useEffect(() => {
    if (userID === 'null') {
      navigation('/signin')
    }
  }, [userID, navigation])

  return <>{children}</>
}
