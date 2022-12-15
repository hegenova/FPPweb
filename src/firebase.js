/* eslint-disable */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcYhtzIZ1P7ZAAyVz__8C3MnQMZESCzz4",
  authDomain: "etspweb-645b0.firebaseapp.com",
  projectId: "etspweb-645b0",
  storageBucket: "etspweb-645b0.appspot.com",
  messagingSenderId: "829267345913",
  appId: "1:829267345913:web:12f736790b369a59eb7d28"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const orderDocRef = doc(db, "order", "threadOrder");
const forColRef = collection(db, "forum");
export default forColRef;