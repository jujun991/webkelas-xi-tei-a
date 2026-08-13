import { initializeApp } from
"https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getFirestore
} from
"https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import {
    getStorage
} from
"https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";


const firebaseConfig = {
  apiKey: "AIzaSyCt-EydmXFA7Mhj9HZKVQdcQsNZkyQ5Ijg",
  authDomain: "web-kelas-xiteia.firebaseapp.com",
  projectId: "web-kelas-xiteia",
  storageBucket: "web-kelas-xiteia.firebasestorage.app",
  messagingSenderId: "146614034602",
  appId: "1:146614034602:web:6af877d34e6b4377bb30d3"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const storage = getStorage(app);


console.log("Firebase berhasil tersambung!");

export {
    app,
    db,
    storage
};