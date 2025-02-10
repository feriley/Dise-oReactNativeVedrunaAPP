import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDB4xQYmUMIpAJV4JPxFkjLZfzlFhs1efU",
  authDomain: "vedrunaappfirebase.firebaseapp.com",
  projectId: "vedrunaappfirebase",
  storageBucket: "vedrunaappfirebase.firebasestorage.app",
  messagingSenderId: "806055929418",
  appId: "1:806055929418:web:4cb450eb174f9166bf68b3",
  measurementId: "G-MQMG9RXCQB"
};
const app = initializeApp(firebaseConfig);

// Configura Auth con persistencia
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { auth };