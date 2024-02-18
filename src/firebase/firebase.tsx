import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyB2BPv-6nbRh-MpZx9GSnBGYIIVKFMUq0A',
  authDomain: 'buzzup-c0073.firebaseapp.com',
  projectId: 'buzzup-c0073',
  storageBucket: 'buzzup-c0073.appspot.com',
  messagingSenderId: '473286220670',
  appId: '1:473286220670:web:b300c4fbf110945ce4f12f',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
