// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore/lite'
// import { getEnvironments } from '../helpers/getEnvironments';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
//dev/prod
const firebaseConfig = {
  apiKey: "AIzaSyCg3dH1bvysaz_tVzQeReOrlEq23VA9gzc",
  authDomain: "react-courses-e3bf6.firebaseapp.com",
  projectId: "react-courses-e3bf6",
  storageBucket: "react-courses-e3bf6.appspot.com",
  messagingSenderId: "1054856956705",
  appId: "1:1054856956705:web:f7c1e784efa732151c4c60"
};
// const {
//   VITE_APIKEY,
//   VITE_AUTHDOMAIN,
//   VITE_PROJECTID,
//   VITE_STORAGEBUCKET,
//   VITE_MESSAGINGSENDERID,
//   VITE_APPID
// } = getEnvironments();
//testing
// const firebaseConfig = {
  // apiKey: "AIzaSyBkl1DiWvpw9dOxRLV4PaLluLDooc_4eGQ",
  // authDomain: "react-test-49014.firebaseapp.com",
  // projectId: "react-test-49014",
  // storageBucket: "react-test-49014.appspot.com",
  // messagingSenderId: "467108364463",
  // appId: "1:467108364463:web:227c5974d849dc36d5945a"
// };

// const firebaseConfig = {
//   apiKey:VITE_APIKEY,
//   authDomain: VITE_AUTHDOMAIN,
//   projectId: VITE_PROJECTID,
//   storageBucket: VITE_STORAGEBUCKET,
//   messagingSenderId: VITE_MESSAGINGSENDERID,
//   appId: VITE_APPID
// };
// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(firebaseApp);

export const firebaseDB = getFirestore(firebaseApp);