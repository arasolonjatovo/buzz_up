import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { UserContext } from '../../context/userContext'

import Button from '../../components/Button/Button'
import Todo from '../../components/Todo/Todo'

import './Todos.scss'

import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  getDoc,
} from 'firebase/firestore'
import { db } from '../../firebase/firebase'

interface TodoData {
  id: string
  tasks: string[]
  user: { email: string; ID: string }[]
}

export default function Todos() {
  const { userEmail, userID } = useContext(UserContext)

  const [array, setArray] = useState<TodoData[]>([])

  const navigate = useNavigate()

  const addNewTodo = async () => {
    const todoCollection = collection(db, 'todo')
    const data = {
      tasks: [],
      user: [{ email: userEmail, ID: userID }],
    }

    try {
      const docRef = await addDoc(todoCollection, data)
      console.log('Document ajouté avec ID :', docRef.id)

      const docSnapshot = await getDoc(docRef)

      if (docSnapshot.exists()) {
        const todoData: TodoData = {
          id: docRef.id,
          tasks: docSnapshot.data()?.tasks || [],
          user: docSnapshot.data()?.user || [],
        }

        setArray([...array, todoData])
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du document :", error)
    }
  }

  const getTodo = async () => {
    const userQuery = query(
      collection(db, 'todo'),
      where('user', 'array-contains', { email: userEmail, ID: userID })
    )

    const querySnapshot = await getDocs(userQuery)
    const arrayBuff: TodoData[] = []
    querySnapshot.forEach((doc) => {
      const todoData: TodoData = {
        id: doc.id,
        tasks: doc.data()?.tasks || [],
        user: doc.data()?.user || [],
      }

      arrayBuff.push(todoData)
    })

    setArray(arrayBuff)
  }

  useEffect(() => {
    getTodo()
  }, [])

  return (
    <>
      <header className="todos_header">
        <h1 className="todos__title">MY TO-DOS</h1>
        <Button
          label="+ Add a todo"
          variant="primary"
          handleClick={addNewTodo}
        />
      </header>
      <div id="todo__container">
        {array.map((el, index) => (
          <Todo
            index={index + 1}
            key={index}
            handleClick={() => {
              navigate(`/todo/${el.id}`)
            }}
          />
        ))}
      </div>
    </>
  )
}
