// AuthContext.js
"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { logOut } from '../firebase/auth';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('AuthProvider: Setting up auth listener');
    
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('Auth state changed:', firebaseUser ? 'User logged in' : 'No user');
      
      if (firebaseUser) {
        console.log('Firebase user:', firebaseUser.email, firebaseUser.uid);
        setUser(firebaseUser);
        
        try {
          console.log('Fetching user data from Firestore...');
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            console.log('User data found:', userDoc.data());
            setUserData(userDoc.data());
          } else {
            console.log('No user document found in Firestore');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        console.log('Setting user to null');
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return () => {
      console.log('AuthProvider: Cleaning up auth listener');
      unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      console.log('Logging out...');
      await logOut();
      setUser(null);
      setUserData(null);
      console.log('Logout successful');
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
      alert('Error logging out. Please try again.');
    }
  };

  const value = {
    currentUser: user, // Add this alias for compatibility
    user, // Original
    userData,
    loading,
    logout: handleLogout,
    isAuthenticated: !!user,
    isStudent: userData?.userType === 'student',
    isLandlord: userData?.userType === 'landlord'
  };

  console.log('AuthProvider value:', value);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};