import { initializeApp, getApps } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzApKurpt41ri9d7sXXZkqYYl1KYgdGwc",
  authDomain: "carmart-app-8a3ff.firebaseapp.com",
  projectId: "carmart-app-8a3ff",
  storageBucket: "carmart-app-8a3ff.firebasestorage.app",
  messagingSenderId: "571144957346",
  appId: "1:571144957346:web:3abaf4f11e6ee4eef796fb"
};

// Initialize Firebase
const currentApps = getApps();
let auth: Auth;

if (!currentApps.length) {
  const app = initializeApp(firebaseConfig)
  auth = getAuth(app);
} else {
  const app = currentApps[0];
  auth = getAuth(app);
}

export { auth };