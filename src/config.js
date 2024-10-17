import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCjEJthU2FUaRkBD2ia2kHvdFXCMDj0WBk",
    authDomain: "gdmprojects-cf226.firebaseapp.com",
    projectId: "gdmprojects-cf226",
    storageBucket: "gdmprojects-cf226.appspot.com",
    messagingSenderId: "457916488611",
    appId: "1:457916488611:web:e7484ff919b7964e629816"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };