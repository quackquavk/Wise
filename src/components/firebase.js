// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBIgJfG0Vooe4F0pAP8MzEJ_BD8AmW8gMw',
  authDomain: 'wise-c06a8.firebaseapp.com',
  projectId: 'wise-c06a8',
  storageBucket: 'wise-c06a8.appspot.com',
  messagingSenderId: '150966750890',
  appId: '1:150966750890:web:275964ed2d79f9592d0ad3',
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export default app;
