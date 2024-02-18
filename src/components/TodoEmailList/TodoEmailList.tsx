import React, { useState } from 'react'
import './TodoEmailList.scss'
import Button from '../Button/Button'
import { db } from '../../firebase/firebase'
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from 'firebase/firestore'
import { useParams } from 'react-router-dom'

export interface Mail {
  ID: string
  email: string
}

interface TodoEmailListProps {
  mails: Mail[]
}

export default function TodoEmailList({ mails }: TodoEmailListProps) {
  const [newEmail, setNewEmail] = useState('')

  const { id } = useParams()

  const addEmail = async () => {
    const userQuery = query(
      collection(db, 'user'),
      where('email', '==', newEmail)
    )

    const querySnapshot = await getDocs(userQuery)

    if (querySnapshot.empty) {
      return
    }
    const userDoc = querySnapshot.docs[0]

    setNewEmail('')

    const myMail: Mail = {
      ID: userDoc.data().ID,
      email: newEmail,
    }

    const myNewMails = mails.slice()
    myNewMails.push(myMail)
    if (id) {
      const docRef = doc(db, 'todo', id)
      await updateDoc(docRef, { user: myNewMails })
    }
  }

  return (
    <div className="emailListContainer">
      <h2>See who has access to my to do 👀 :</h2>
      <ul className="emailList">
        {mails.map((mail, index) => (
          <li key={index}>{mail.email}</li>
        ))}
      </ul>
      <input
        type="email"
        placeholder="Enter the email"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
      />
      <Button variant="primary" label="ADD EMAIL" handleClick={addEmail} />
    </div>
  )
}
