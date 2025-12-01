// Firebase Storage Services (for image uploads)
// Place this file in: src/firebase/storage.js

import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject,
  listAll
} from 'firebase/storage';
import { storage } from './config';

// Upload property images
export const uploadPropertyImages = async (propertyId, imageFiles) => {
  try {
    const imageUrls = [];

    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i];
      const timestamp = Date.now();
      const fileName = `${propertyId}_${timestamp}_${i}`;
      
      // Create storage reference
      const storageRef = ref(storage, `properties/${propertyId}/${fileName}`);
      
      // Upload file
      await uploadBytes(storageRef, file);
      
      // Get download URL
      const downloadURL = await getDownloadURL(storageRef);
      imageUrls.push(downloadURL);
    }

    console.log('Images uploaded successfully:', imageUrls.length);
    return { success: true, imageUrls };
  } catch (error) {
    console.error('Error uploading images:', error);
    return { success: false, error: error.message };
  }
};

// Upload single image
export const uploadSingleImage = async (path, file) => {
  try {
    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.name}`;
    const storageRef = ref(storage, `${path}/${fileName}`);
    
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    
    console.log('Image uploaded:', downloadURL);
    return { success: true, imageUrl: downloadURL };
  } catch (error) {
    console.error('Error uploading image:', error);
    return { success: false, error: error.message };
  }
};

// Upload profile picture
export const uploadProfilePicture = async (userId, file) => {
  return uploadSingleImage(`profiles/${userId}`, file);
};

// Delete image
export const deleteImage = async (imagePath) => {
  try {
    const imageRef = ref(storage, imagePath);
    await deleteObject(imageRef);
    
    console.log('Image deleted:', imagePath);
    return { success: true };
  } catch (error) {
    console.error('Error deleting image:', error);
    return { success: false, error: error.message };
  }
};

// Delete all property images
export const deletePropertyImages = async (propertyId) => {
  try {
    const folderRef = ref(storage, `properties/${propertyId}`);
    const fileList = await listAll(folderRef);
    
    // Delete all files in the folder
    const deletePromises = fileList.items.map(fileRef => deleteObject(fileRef));
    await Promise.all(deletePromises);
    
    console.log('All property images deleted');
    return { success: true };
  } catch (error) {
    console.error('Error deleting property images:', error);
    return { success: false, error: error.message };
  }
};

// Compress and validate image before upload
export const validateAndCompressImage = (file, maxSizeMB = 10) => {
  return new Promise((resolve, reject) => {
    // Check file size (in MB)
    const fileSizeMB = file.size / 1024 / 1024;
    
    if (fileSizeMB > maxSizeMB) {
      reject(new Error(`File size must be less than ${maxSizeMB}MB`));
      return;
    }

    // Check file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      reject(new Error('Only JPG, PNG, and WebP images are allowed'));
      return;
    }

    // You can add image compression here if needed
    // For now, just resolve with the original file
    resolve(file);
  });
};

// Upload multiple images with validation
export const uploadMultipleImages = async (propertyId, files) => {
  try {
    // Validate all files first
    const validatedFiles = await Promise.all(
      Array.from(files).map(file => validateAndCompressImage(file))
    );

    // Upload validated files
    return await uploadPropertyImages(propertyId, validatedFiles);
  } catch (error) {
    console.error('Error in upload process:', error);
    return { success: false, error: error.message };
  }
};