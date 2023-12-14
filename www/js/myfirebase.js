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

import { getDatabase, query, ref, set, update, push, child, onValue, get, orderByChild, limitToLast,orderByKey } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js';
// import '/node_modules/@firebase/firestore';

// 初始化 Firebase Realtime Database
const database = getDatabase(app);

const dbRef = ref(database, '/test2/');

const sortedRef = orderByKey(dbRef);
const limitCount = 1; // 你想要的資料筆數
const limitedRef = query(ref(database, 'test2'),limitToLast(limitCount));

// export function getData(link){
//   get(limitedRef).then((onSnapshot) => {
//     if(onSnapshot.exists()) {
//       const allItems = onSnapshot.val();
//       // console.log(allItems);

//       // 遍歷每個物件，並抓取img屬性
//       for (const key in allItems) {
//         if (allItems.hasOwnProperty(key)) {
//           const imgContent = allItems[key].img;
//           console.log(imgContent);
//           link = imgContent;
//           console.log(link);
//           return link;
//         }
//       }

//     } else {
//       console.log('沒有資料');
//     }
//     }).catch((error) => {
//       console.error(error);
//   });
// }

export function getData() {
  return new Promise((resolve, reject) => {
    get(limitedRef)
      .then((onSnapshot) => {
        if (onSnapshot.exists()) {
          const allItems = onSnapshot.val();

          // 遍歷每個物件，並抓取 img 屬性
          for (const key in allItems) {
            if (allItems.hasOwnProperty(key)) {
              const imgContent = allItems[key].img;
              resolve(imgContent);
              return;
            }
          }
        } else {
          console.log('沒有資料');
          reject('沒有資料');
        }
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
}


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
}
