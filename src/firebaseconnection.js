import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBlQM0JVQhj2ELMOvAS3-UFNKiGUW0HJ-8",
  authDomain: "intergilapp.firebaseapp.com",
  projectId: "intergilapp",
  storageBucket: "intergilapp.firebasestorage.app",
  messagingSenderId: "293162078377",
  appId: "1:293162078377:web:1fa85a28b52187dcac19b8",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
