// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCg3dH1bvysaz_tVzQeReOrlEq23VA9gzc",
  authDomain: "react-courses-e3bf6.firebaseapp.com",
  projectId: "react-courses-e3bf6",
  storageBucket: "react-courses-e3bf6.appspot.com",
  messagingSenderId: "1054856956705",
  appId: "1:1054856956705:web:f7c1e784efa732151c4c60"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(firebaseApp);

export const firebaseDB = getFirestore(firebaseApp);