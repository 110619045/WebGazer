// 引入 Firebase SDK 文件（本地文件路径可能不同，根据实际情况修改）
// 请确保这些文件都正确引入了
// <script src="path-to-firebase-app.js"></script>
// <script src="path-to-firebase-analytics.js"></script>
// <script src="path-to-firebase-auth.js"></script>
// <script src="path-to-firebase-firestore.js"></script>
// <script src="path-to-firebase-database.js"></script>
/* <script src="/Users/phoebe/Documents/GitHub/WebGazer/www/node_modules/@firebase/app.js"></script> */
// import { initializeApp } from '../node_modules/@firebase/app';
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";

// import { getDatabase, ref, set, update, push, child } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js';

// import { getDatabase, ref, set, update, push, child } from '../node_modules/@firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "Your-API-Key",
  authDomain: "Your-Auth-Domain",
  databaseURL: "Your-Database-URL",
  projectId: "Your-Project-ID",
  storageBucket: "Your-Storage-Bucket",
  messagingSenderId: "Your-Messaging-Sender-ID",
  appId: "Your-App-ID"
};

// firebase.initializeApp(firebaseConfig);

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

function consoleLogApp() {
  console.log(app);
}

// 初始化 Firebase Realtime Database
const database = firebase.database();

// 寫入數據
function setData(a) {
  const newKey = database.ref('users').push().key;
  const data = {
    username: a
  };
  const updates = {};
  updates['/users/' + newKey] = data;
  database.ref().update(updates);
}

function setDataTest1(a) {
  const newKey = database.ref('test1').push().key;
  const data = {
    username: a
  };
  const updates = {};
  updates['/test1/' + newKey] = data;
  database.ref().update(updates);
}
