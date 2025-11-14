// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRA6yxajkvRd2a8e9aW4rwfCFnxZ1iwrA",
  authDomain: "krishilink-baae3.firebaseapp.com",
  projectId: "krishilink-baae3",
  storageBucket: "krishilink-baae3.firebasestorage.app",
  messagingSenderId: "40936017702",
  appId: "1:40936017702:web:e14c7732349459460cbbe7",
  measurementId: "G-SBB6RGE4ZL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);