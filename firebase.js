// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD4rmUu9nPKwC_erNodLrUAGistX2J-0kU',
  authDomain: 'sports-day-f6238.firebaseapp.com',
  projectId: 'sports-day-f6238',
  storageBucket: 'sports-day-f6238.appspot.com',
  messagingSenderId: '572383911374',
  appId: '1:572383911374:web:18e4720659880661559f9f',
  measurementId: 'G-3SHRKS4TEL',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
