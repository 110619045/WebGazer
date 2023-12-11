// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
// If you enabled Analytics in your project, add the Firebase SDK for Google Analytics
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-analytics.js'

// Add Firebase products that you want to use
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js'
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js'


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

export function consoleLogApp(){
  console.log(app);
}

import { getDatabase, ref, set, update, push, child, onValue, get } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js';
// import '/node_modules/@firebase/firestore';

// 初始化 Firebase Realtime Database
const database = getDatabase(app);

const dbRef = ref(database, '/test2/');

export function getData(){
  get(child(dbRef, '/')).then((snapshot) => {
    if(snapshot.exists()) {
      console.log(snapshot.val());
    } else {
      console.log('沒有資料');
    }
    }).catch((error) => {
      console.error(error);
  });
  console.log('key' + finalKey);
}

// get(child(dbRef, 'users/')).then((snapshot) => {
//   if(snapshot.exists()) {
//     console.log(snapshot.val());
//   } else {
//     console.log('沒有資料');
//   }
//   }).catch((error) => {
//     console.error(error);
// });

var finalKey = 1;

export function setDataText(a,b) {
  if (a === undefined) {
    console.error('Error: Trying to set undefined value to Firebase');
    return;
  } 
  // 建立一組亂數序號
  const newKey = push(child(ref(database), 'test1')).key;
  // 寫入資料
  set(ref(database, 'test2/' + newKey), {
      text: a,
      img: b,
  });
  // return a;
  finalKey = newKey;
  console.log('key' + finalKey);
}
