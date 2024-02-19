import React, { useState, useEffect } from 'react'
import './Tasks.scss'
import Button from '../../components/Button/Button'
import InputText from '../../components/InputText/InputText'
import TodoEmailList, {
  Mail,
} from '../../components/TodoEmailList/TodoEmailList'
import { db } from '../../firebase/firebase'
import { useParams } from 'react-router-dom'
import { onSnapshot, doc, updateDoc } from 'firebase/firestore'

interface Task {
  name: string
  completed: boolean
  id: number
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState<string>('')
  const [filter, setFilter] = useState<string>('all')
  const [mails, setMails] = useState<Mail[]>([])
  const { id } = useParams<{ id: string }>()
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null)
  const [editingTaskName, setEditingTaskName] = useState<string>('')

  useEffect(() => {
    if (id) {
      const todoCollectionRef = doc(db, 'todo', id)
      const unsubscribe = onSnapshot(todoCollectionRef, (querySnapshot) => {
        console.log(querySnapshot.data())
        setTasks(querySnapshot.data()?.tasks || [])
        setMails(querySnapshot.data()?.user || [])
      })
      return unsubscribe
    }
  }, [id])

  const addTask = async () => {
    setNewTask('')

    const myTask: Task = {
      name: newTask,
      completed: false,
      id: Date.now(),
    }

    const myNewTasks = tasks.concat(myTask)
    setTasks(myNewTasks)
    if (id) {
      const docRef = doc(db, 'todo', id)
      await updateDoc(docRef, { tasks: myNewTasks })
    }
  }

  const deleteTask = async (taskId: number) => {
    const dropTab = tasks.filter((myNewTask) => myNewTask.id !== taskId)
    setTasks(dropTab)
    if (id) {
      const docRef = doc(db, 'todo', id)
      await updateDoc(docRef, { tasks: dropTab })
    }
  }

  const toggleTaskCompletion = async (taskId: number) => {
    const updatedTask = [...tasks]
    const taskToUpdate = updatedTask.find((task) => task.id === taskId)

    if (taskToUpdate) {
      taskToUpdate.completed = !taskToUpdate.completed
      setTasks(updatedTask)

      if (id) {
        const docRef = doc(db, 'todo', id)
        await updateDoc(docRef, { tasks: updatedTask })
      }
    }
  }

  const startEditingTask = (taskId: number, taskName: string) => {
    setEditingTaskId(taskId)
    setEditingTaskName(taskName)
  }

  const finishEditingTask = async () => {
    if (editingTaskId !== null) {
      const updatedTasks = tasks.map((task) =>
        task.id === editingTaskId ? { ...task, name: editingTaskName } : task
      )
      setTasks(updatedTasks)
      setEditingTaskId(null)
      setEditingTaskName('')

      if (id) {
        const docRef = doc(db, 'todo', id)
        await updateDoc(docRef, { tasks: updatedTasks })
      }
    }
  }

  const handleFilterClick = (filterType: string) => {
    setFilter(filterType)
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') {
      return task.completed
    } else if (filter === 'uncompleted') {
      return !task.completed
    } else {
      return true
    }
  })

  return (
    <>
      <div className="todo">
        <h1>MY TO-DO</h1>

        <div className="addTask">
          <InputText
            desc="New task"
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            icon={''}
          />

          <Button label="ADD TASK" handleClick={addTask} variant="primary" />
        </div>

        <div className="filterBtn">
          <Button
            label="Toutes les tâches"
            handleClick={() => handleFilterClick('all')}
            variant={filter === 'all' ? 'primary' : 'secondary'}
          />
          <Button
            variant={filter === 'completed' ? 'primary' : 'secondary'}
            label="Tâches complétées"
            handleClick={() => handleFilterClick('completed')}
          />
          <Button
            variant={filter === 'uncompleted' ? 'primary' : 'secondary'}
            label="Tâches non complétées"
            handleClick={() => handleFilterClick('uncompleted')}
          />
        </div>

        <ul className="todoUl">
          {filteredTasks.map((task) => (
            <li className="task" key={task.id}>
              {editingTaskId === task.id ? (
                <input
                  type="text"
                  value={editingTaskName}
                  onChange={(e) => setEditingTaskName(e.target.value)}
                  onBlur={finishEditingTask}
                />
              ) : (
                <span
                  style={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                  }}
                >
                  {task.name}
                </span>
              )}
              <span className="deleteCheck">
                <input
                  type="checkbox"
                  checked={task.completed}
                  className="checkbox-input"
                  onChange={() => toggleTaskCompletion(task.id)}
                />
                <Button
                  variant="primary"
                  label="Edit"
                  handleClick={() => startEditingTask(task.id, task.name)}
                />
                <Button
                  variant="primary"
                  label="Delete"
                  handleClick={() => deleteTask(task.id)}
                />
              </span>
            </li>
          ))}
        </ul>
        <TodoEmailList mails={mails} />
      </div>
    </>
  )
}
