import React, { createContext, useState, useEffect, ReactNode } from 'react'

export type UserContextType = {
  userEmail: string | null
  setUserEmail: React.Dispatch<React.SetStateAction<string | null>>
  userID: string | null
  setUserID: React.Dispatch<React.SetStateAction<string | null>>
}

export const UserContext = createContext<UserContextType>({
  userEmail: null,
  setUserEmail: () => {},
  userID: null,
  setUserID: () => {},
})

type Props = {
  children: ReactNode
}

const UserContextProvider: React.FC<Props> = ({ children }) => {
  const [userEmail, setUserEmail] = useState<string | null>(() =>
    localStorage.getItem('userEmail')
  )
  const [userID, setUserID] = useState<string | null>(() =>
    localStorage.getItem('userID')
  )

  useEffect(() => {
    localStorage.setItem('userEmail', userEmail || '')
  }, [userEmail])

  useEffect(() => {
    localStorage.setItem('userID', userID || '')
  }, [userID])

  return (
    <UserContext.Provider
      value={{ userEmail, setUserEmail, userID, setUserID }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
