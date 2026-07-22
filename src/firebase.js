// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBY_deU3ivmRGM6n9-AnHPg8nwQRe0iHt8",
  authDomain: "hadi-portfolio-8e2f4.firebaseapp.com",
  projectId: "hadi-portfolio-8e2f4",
  storageBucket: "hadi-portfolio-8e2f4.firebasestorage.app",
  messagingSenderId: "921671858030",
  appId: "1:921671858030:web:b7910fce3f27523484b37f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore & Auth so other files can use them
export const db = getFirestore(app);
export const auth = getAuth(app);