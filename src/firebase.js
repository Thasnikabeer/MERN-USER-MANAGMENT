// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-47d67.firebaseapp.com",
  projectId: "mern-auth-47d67",
  storageBucket: "mern-auth-47d67.appspot.com",
  messagingSenderId: "165956629624",
  appId: "1:165956629624:web:a50e422abb05d7f5b6298d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);