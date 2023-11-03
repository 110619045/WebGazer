// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeKDCSCxOR2e_Pglko9BezH77KbDdnjbc",
  authDomain: "test1-877ad.firebaseapp.com",
  databaseURL: "https://test1-877ad-default-rtdb.firebaseio.com",
  projectId: "test1-877ad",
  storageBucket: "test1-877ad.appspot.com",
  messagingSenderId: "1012563815526",
  appId: "1:1012563815526:web:5d4186658dc6e530ef11a7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app)


// const firebaseConfig = {
//   apiKey: "AIzaSyAeKDCSCxOR2e_Pglko9BezH77KbDdnjbc",
//   authDomain: "test1-877ad.firebaseapp.com",
//   databaseURL: "https://test1-877ad-default-rtdb.firebaseio.com",
//   projectId: "test1-877ad",
//   storageBucket: "test1-877ad.appspot.com",
//   messagingSenderId: "1012563815526",
//   appId: "1:1012563815526:web:5d4186658dc6e530ef11a7"
// };

// // initialize firebase
// firebase.initializeApp(firebaseConfig);

// //reference database
// const db = firebase.initializeApp(firebaseConfig);
// console.log(db)