// layout.js
"use client"; // Add this since you're using AuthProvider (client component)

import { useEffect } from 'react';
import Navbar from "./Navbar";
import Footer from "./Footer";
import { AuthProvider } from '../contexts/AuthContext'; // Adjust path

export default function Layout({ children }) {
  useEffect(() => {
    console.log('Layout mounted');
  }, []);

  return (
    <AuthProvider>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </AuthProvider>
  );
}