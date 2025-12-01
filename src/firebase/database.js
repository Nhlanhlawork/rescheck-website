// Firebase Firestore Database Services
// Place this file in: src/firebase/database.js

import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  updateDoc,
  deleteDoc,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './config';

// ============================================
// PROPERTY FUNCTIONS (For Landlords)
// ============================================

// Add new property
export const addProperty = async (landlordId, propertyData) => {
  try {
    const propertyRef = await addDoc(collection(db, 'properties'), {
      landlordId,
      ...propertyData,
      status: 'Available',
      views: 0,
      applications: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    console.log('Property added with ID:', propertyRef.id);
    return { success: true, propertyId: propertyRef.id };
  } catch (error) {
    console.error('Error adding property:', error);
    return { success: false, error: error.message };
  }
};

// Get properties by landlord
export const getLandlordProperties = async (landlordId) => {
  try {
    const q = query(
      collection(db, 'properties'),
      where('landlordId', '==', landlordId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const properties = [];
    
    querySnapshot.forEach((doc) => {
      properties.push({ id: doc.id, ...doc.data() });
    });

    return { success: true, properties };
  } catch (error) {
    console.error('Error getting properties:', error);
    return { success: false, error: error.message };
  }
};

// Update property
export const updateProperty = async (propertyId, updates) => {
  try {
    const propertyRef = doc(db, 'properties', propertyId);
    await updateDoc(propertyRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });

    console.log('Property updated:', propertyId);
    return { success: true };
  } catch (error) {
    console.error('Error updating property:', error);
    return { success: false, error: error.message };
  }
};

// Delete property
export const deleteProperty = async (propertyId) => {
  try {
    await deleteDoc(doc(db, 'properties', propertyId));
    console.log('Property deleted:', propertyId);
    return { success: true };
  } catch (error) {
    console.error('Error deleting property:', error);
    return { success: false, error: error.message };
  }
};

// Get all available properties (for students)
export const getAvailableProperties = async (filters = {}) => {
  try {
    let q = query(
      collection(db, 'properties'),
      where('status', '==', 'Available')
    );

    // Add filters if provided
    if (filters.university) {
      q = query(q, where('nearUniversity', '==', filters.university));
    }
    if (filters.maxPrice) {
      q = query(q, where('price', '<=', filters.maxPrice));
    }

    const querySnapshot = await getDocs(q);
    const properties = [];
    
    querySnapshot.forEach((doc) => {
      properties.push({ id: doc.id, ...doc.data() });
    });

    return { success: true, properties };
  } catch (error) {
    console.error('Error getting properties:', error);
    return { success: false, error: error.message };
  }
};

// Increment property views
export const incrementPropertyViews = async (propertyId) => {
  try {
    const propertyRef = doc(db, 'properties', propertyId);
    const propertyDoc = await getDoc(propertyRef);
    
    if (propertyDoc.exists()) {
      const currentViews = propertyDoc.data().views || 0;
      await updateDoc(propertyRef, { views: currentViews + 1 });
    }

    return { success: true };
  } catch (error) {
    console.error('Error incrementing views:', error);
    return { success: false, error: error.message };
  }
};

// ============================================
// APPLICATION FUNCTIONS
// ============================================

// Submit application (for students)
export const submitApplication = async (studentId, propertyId, applicationData) => {
  try {
    const applicationRef = await addDoc(collection(db, 'applications'), {
      studentId,
      propertyId,
      ...applicationData,
      status: 'Pending',
      submittedAt: serverTimestamp()
    });

    // Increment application count on property
    const propertyRef = doc(db, 'properties', propertyId);
    const propertyDoc = await getDoc(propertyRef);
    
    if (propertyDoc.exists()) {
      const currentApps = propertyDoc.data().applications || 0;
      await updateDoc(propertyRef, { applications: currentApps + 1 });
    }

    console.log('Application submitted:', applicationRef.id);
    return { success: true, applicationId: applicationRef.id };
  } catch (error) {
    console.error('Error submitting application:', error);
    return { success: false, error: error.message };
  }
};

// Get student applications
export const getStudentApplications = async (studentId) => {
  try {
    const q = query(
      collection(db, 'applications'),
      where('studentId', '==', studentId),
      orderBy('submittedAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const applications = [];
    
    for (const docSnap of querySnapshot.docs) {
      const appData = docSnap.data();
      
      // Get property details
      const propertyDoc = await getDoc(doc(db, 'properties', appData.propertyId));
      const propertyData = propertyDoc.exists() ? propertyDoc.data() : null;
      
      applications.push({
        id: docSnap.id,
        ...appData,
        property: propertyData
      });
    }

    return { success: true, applications };
  } catch (error) {
    console.error('Error getting applications:', error);
    return { success: false, error: error.message };
  }
};

// Get applications for landlord's properties
export const getLandlordApplications = async (landlordId) => {
  try {
    // First get all landlord's properties
    const propertiesResult = await getLandlordProperties(landlordId);
    if (!propertiesResult.success) {
      return propertiesResult;
    }

    const propertyIds = propertiesResult.properties.map(p => p.id);
    
    // Get applications for these properties
    const applications = [];
    
    for (const propertyId of propertyIds) {
      const q = query(
        collection(db, 'applications'),
        where('propertyId', '==', propertyId)
      );
      
      const querySnapshot = await getDocs(q);
      
      for (const docSnap of querySnapshot.docs) {
        const appData = docSnap.data();
        
        // Get student details
        const studentDoc = await getDoc(doc(db, 'users', appData.studentId));
        const studentData = studentDoc.exists() ? studentDoc.data() : null;
        
        // Get property details
        const propertyDoc = await getDoc(doc(db, 'properties', appData.propertyId));
        const propertyData = propertyDoc.exists() ? propertyDoc.data() : null;
        
        applications.push({
          id: docSnap.id,
          ...appData,
          student: studentData,
          property: propertyData
        });
      }
    }

    return { success: true, applications };
  } catch (error) {
    console.error('Error getting landlord applications:', error);
    return { success: false, error: error.message };
  }
};

// Update application status (approve/decline)
export const updateApplicationStatus = async (applicationId, status) => {
  try {
    const applicationRef = doc(db, 'applications', applicationId);
    await updateDoc(applicationRef, {
      status,
      updatedAt: serverTimestamp()
    });

    console.log('Application status updated:', applicationId, status);
    return { success: true };
  } catch (error) {
    console.error('Error updating application status:', error);
    return { success: false, error: error.message };
  }
};

// ============================================
// SAVED PROPERTIES (For Students)
// ============================================

// Save/favorite a property
export const saveProperty = async (studentId, propertyId) => {
  try {
    const savedRef = doc(db, 'savedProperties', `${studentId}_${propertyId}`);
    await setDoc(savedRef, {
      studentId,
      propertyId,
      savedAt: serverTimestamp()
    });

    console.log('Property saved:', propertyId);
    return { success: true };
  } catch (error) {
    console.error('Error saving property:', error);
    return { success: false, error: error.message };
  }
};

// Unsave property
export const unsaveProperty = async (studentId, propertyId) => {
  try {
    await deleteDoc(doc(db, 'savedProperties', `${studentId}_${propertyId}`));
    console.log('Property unsaved:', propertyId);
    return { success: true };
  } catch (error) {
    console.error('Error unsaving property:', error);
    return { success: false, error: error.message };
  }
};

// Get saved properties
export const getSavedProperties = async (studentId) => {
  try {
    const q = query(
      collection(db, 'savedProperties'),
      where('studentId', '==', studentId)
    );
    
    const querySnapshot = await getDocs(q);
    const savedProperties = [];
    
    for (const docSnap of querySnapshot.docs) {
      const savedData = docSnap.data();
      
      // Get property details
      const propertyDoc = await getDoc(doc(db, 'properties', savedData.propertyId));
      if (propertyDoc.exists()) {
        savedProperties.push({
          id: propertyDoc.id,
          ...propertyDoc.data()
        });
      }
    }

    return { success: true, properties: savedProperties };
  } catch (error) {
    console.error('Error getting saved properties:', error);
    return { success: false, error: error.message };
  }
};

// Check if property is saved
export const isPropertySaved = async (studentId, propertyId) => {
  try {
    const savedRef = doc(db, 'savedProperties', `${studentId}_${propertyId}`);
    const savedDoc = await getDoc(savedRef);
    return savedDoc.exists();
  } catch (error) {
    console.error('Error checking saved status:', error);
    return false;
  }
};