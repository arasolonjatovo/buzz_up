import {
  signInWithEmailAndPassword,
  UserCredential,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth'
import { auth } from './firebase'

export function authSignIn(
  email: string,
  password: string
): Promise<UserCredential['user']> {
  return setPersistence(auth, browserSessionPersistence).then(() => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential: UserCredential) => {
        const user = userCredential.user
        console.log('User logged in:', user)
        return user
      })
      .catch((error: { message: string; code: string }) => {
        console.error(error.message, error.code)
        if (
          error.code === 'auth/user-not-found' ||
          error.code === 'auth/wrong-password'
        ) {
          throw new Error('Invalid email or password. Please try again.')
        } else {
          throw error
        }
      })
  })
}
