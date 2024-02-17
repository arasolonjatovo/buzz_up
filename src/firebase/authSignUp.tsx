import { createUserWithEmailAndPassword, UserCredential } from 'firebase/auth'
import { addDoc, collection, DocumentReference } from 'firebase/firestore'
import { auth, db } from './firebase'

interface UserData {
  email: string;
  ID: string;
}

export function authSignUp(email: string, password: string): Promise<UserCredential['user']> {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential: UserCredential) => {
        const user = userCredential.user
        console.log('User registered:', user)
        const userCollection = collection(db, 'user')
        const data: UserData = { email: email, ID: user.uid }

        const docRef: DocumentReference = await addDoc(userCollection, data)
        console.log('user créé:', docRef)
        resolve(user)
      })
      .catch((error: { message: string; code: string }) => {
        console.error(error.message, error.code)
        if (error.code === 'auth/email-already-in-use') {
          alert('This account already exists.')
        } else {
          reject(error.message)
        }
      })
  })
}