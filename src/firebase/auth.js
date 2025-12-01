// Firebase Authentication Services
// Place this file in: src/firebase/auth.js

import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './config';

// Sign Up Function
export const signUp = async (email, password, userData) => {
  try {
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update display name
    await updateProfile(user, {
      displayName: userData.name
    });

    // Create user document in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      name: userData.name,
      email: email,
      userType: userData.userType, // 'student' or 'landlord'
      university: userData.university || null,
      targetUniversities: userData.targetUniversities || [],
      createdAt: new Date().toISOString(),
      profileComplete: false
    });

    console.log('User signed up successfully:', user.uid);
    return { success: true, user };
  } catch (error) {
    console.error('Error signing up:', error);
    return { success: false, error: error.message };
  }
};

// Sign In Function
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Get user data from Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      console.log('User signed in successfully:', user.uid);
      return { success: true, user, userData };
    } else {
      return { success: false, error: 'User data not found' };
    }
  } catch (error) {
    console.error('Error signing in:', error);
    return { success: false, error: error.message };
  }
};

// Sign Out Function
export const logOut = async () => {
  try {
    await signOut(auth);
    console.log('User signed out successfully');
    return { success: true };
  } catch (error) {
    console.error('Error signing out:', error);
    return { success: false, error: error.message };
  }
};

// Password Reset Function
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log('Password reset email sent');
    return { success: true };
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return { success: false, error: error.message };
  }
};

// Get Current User
export const getCurrentUser = () => {
  return auth.currentUser;
};

// Check Auth State
export const onAuthStateChange = (callback) => {
  return auth.onAuthStateChanged(callback);
};