import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBlQM0JVQhj2ELMOvAS3-UFNKiGUW0HJ-8",
  authDomain: "intergilapp.firebaseapp.com",
  projectId: "intergilapp",
  storageBucket: "intergilapp.firebasestorage.app",
  messagingSenderId: "293162078377",
  appId: "1:293162078377:web:1fa85a28b52187dcac19b8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { db, auth };
