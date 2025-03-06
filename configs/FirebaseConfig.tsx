import { initializeApp } from 'firebase/app';
//@ts-ignore
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDHNVt5T9BLQzKUm98cUN0_W2SlFOFxhMw",
    authDomain: "mivy-4114c.firebaseapp.com",
    projectId: "mivy-4114c",
    storageBucket: "mivy-4114c.firebasestorage.app",
    messagingSenderId: "140274485453",
    appId: "1:140274485453:web:54618ec20a6e9abb984184",
    measurementId: "G-95JHWXN6E8"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with React Native persistence
const auth =
  getAuth(app) || // Try to get an existing auth instance
  initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });

export { auth };

// const analytics = getAnalytics(app);