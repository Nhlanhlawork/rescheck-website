// Firebase Configuration and Initialization
// Place this file in: src/firebase/config.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_DvBp9R6U3QfUDZI8u6qJvBF2k4n3yK4",
  authDomain: "rescheck-ec870.firebaseapp.com",
  projectId: "rescheck-ec870",
  storageBucket: "rescheck-ec870.firebasestorage.app",
  messagingSenderId: "745711048110",
  appId: "1:745711048110:web:a0a1e670c7d0cbdf0ca43f",
  measurementId: "G-2XF1RLP3TB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics (only in browser)
let analytics = null;
if (typeof window !== 'undefined') {
  isSupported().then(yes => {
    if (yes) {
      analytics = getAnalytics(app);
    }
  });
}

export { analytics };
export default app;