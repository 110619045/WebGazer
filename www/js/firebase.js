// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRfMibqrigTp9JDZ9nk6HUctq3_kCeAiY",
  authDomain: "testsd-23af8.firebaseapp.com",
  projectId: "testsd-23af8",
  storageBucket: "testsd-23af8.appspot.com",
  messagingSenderId: "221027265411",
  appId: "1:221027265411:web:5a1d570536c5a509a524b6",
  measurementId: "G-RKB9MTFGNH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);