// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCXVDlAktDr3tXMBCYp6r-N9ikeb6dEbCc',
  authDomain: 'blog-it-kr.firebaseapp.com',
  projectId: 'blog-it-kr',
  storageBucket: 'blog-it-kr.appspot.com',
  messagingSenderId: '905589370668',
  appId: '1:905589370668:web:fb6ae3b1fee86da8350689',
  measurementId: 'G-6WKN28NCWC',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { app, auth };
