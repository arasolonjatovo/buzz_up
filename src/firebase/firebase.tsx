import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig : Object = {
  apiKey: 'AIzaSyDxvwvHoqL6UZxQoFONIa0tOgGIcVH3HFI',
  authDomain: 'projgroupreacttodolist.firebaseapp.com',
  projectId: 'projgroupreacttodolist',
  storageBucket: 'projgroupreacttodolist.appspot.com',
  messagingSenderId: '754145279912',
  appId: '1:754145279912:web:6b3c2f33fb3ed179b3279d',
  measurementId: 'G-JGC19C5NBD',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
