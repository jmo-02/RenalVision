// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClSiBA4kLGfffvyspOr84DTAIS4fz7KBE",
  authDomain: "sesion-3-e63d8.firebaseapp.com",
  projectId: "sesion-3-e63d8",
  storageBucket: "sesion-3-e63d8.firebasestorage.app",
  messagingSenderId: "996176730375",
  appId: "1:996176730375:web:59f5602074c05ee0010da2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);