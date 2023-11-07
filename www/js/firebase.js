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

import { getDatabase, ref, set, update, push, child } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js';
// import '/node_modules/@firebase/firestore';

// 初始化 Firebase Realtime Database
const database = getDatabase(app);

// // 設定數據
// const databaseRef = ref(database);
// for(var i=0; i<=10; i++){
//     set(databaseRef, i);
// }

export function setData( a ) {
    // 建立一組亂數序號
    const newKey = push(child(ref(database), 'users')).key;
    
    // 寫入資料
    set(ref(database, 'users/' + newKey), {
        username: a,
    });

    // return a;
}