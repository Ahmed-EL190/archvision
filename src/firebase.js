// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";      // ➕ أضف هذا
import { getAuth } from "firebase/auth";                // ➕ أضف هذا
import { getStorage } from "firebase/storage";          // ➕ أضف هذا

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaDAxKj7d2-wXYm2DnRplhE5hMvh8wW2g",
  authDomain: "archvision-5f3a2.firebaseapp.com",
  projectId: "archvision-5f3a2",
  storageBucket: "archvision-5f3a2.firebasestorage.app",
  messagingSenderId: "984769933061",
  appId: "1:984769933061:web:e712ca03f934b7ce62116c",
  measurementId: "G-V3EY2WX8R2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ➕ أضف هذه الأسطر (التصديرات المطلوبة)
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;