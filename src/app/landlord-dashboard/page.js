"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Layout from "../../components/Layout";
import { useAuth } from "../../contexts/AuthContext"; // Make sure this path is correct
import {
  addProperty,
  getLandlordProperties,
  getLandlordApplications,
  updateApplicationStatus,
  deleteProperty,
  updateProperty
} from "../../firebase/database";
import { uploadMultipleImages } from "../../firebase/storage";
import {
  Home,
  Building,
  Users,
  MessageSquare,
  Bell,
  Plus,
  Edit,
  Trash2,
  Eye,
  DollarSign,
  MapPin,
  Bed,
  Bath,
  Calendar,
  Upload,
  X,
  Check,
  LogOut,
  Loader
} from "lucide-react";

export default function LandlordDashboard() {
  const router = useRouter();
  const { user, userData, loading: authLoading, logout } = useAuth();
  const [authChecked, setAuthChecked] = useState(false);
  
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddProperty, setShowAddProperty] = useState(false);
  const [properties, setProperties] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  
  const [propertyForm, setPropertyForm] = useState({
    title: "",
    propertyType: "",
    address: "",
    suburb: "",
    city: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    description: "",
    amenities: [],
    availableDate: "",
    images: []
  });

  const amenitiesList = [
    "WiFi",
    "Parking",
    "Security",
    "Furnished",
    "Kitchen",
    "Laundry",
    "Air Conditioning",
    "Heating",
    "Study Room",
    "Garden"
  ];

  const propertyTypes = [
    "Apartment",
    "House",
    "Room",
    "Studio",
    "Bachelor Flat",
    "Cottage"
  ];

  // Check authentication and user type
  useEffect(() => {
    if (!authLoading && !user) {
      // User not logged in, redirect to sign in
      console.log("User not logged in, redirecting to signin");
      router.push('/signin');
    } else if (!authLoading && userData) {
      // User is logged in, check user type
      if (userData.userType !== 'landlord') {
        console.log("User is not a landlord, redirecting to student-dashboard");
        router.push('/student-dashboard');
      } else {
        console.log("User is a landlord, allowing access");
        setAuthChecked(true);
      }
    }
  }, [user, userData, authLoading, router]);

  // Load properties and applications only after auth is confirmed
  useEffect(() => {
    if (authChecked && user) {
      loadData();
    }
  }, [authChecked, user]);

  const loadData = async () => {
    setLoading(true);
    try {
      console.log("Loading data for user:", user.uid);
      
      // Load properties
      const propertiesResult = await getLandlordProperties(user.uid);
      console.log("Properties result:", propertiesResult);
      if (propertiesResult.success) {
        setProperties(propertiesResult.properties);
      }

      // Load applications
      const applicationsResult = await getLandlordApplications(user.uid);
      console.log("Applications result:", applicationsResult);
      if (applicationsResult.success) {
        setApplications(applicationsResult.applications);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAmenityToggle = (amenity) => {
    if (propertyForm.amenities.includes(amenity)) {
      setPropertyForm({
        ...propertyForm,
        amenities: propertyForm.amenities.filter((a) => a !== amenity)
      });
    } else {
      setPropertyForm({
        ...propertyForm,
        amenities: [...propertyForm.amenities, amenity]
      });
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedImages(files);
    console.log("Images selected:", files.length);
  };

  const handleSubmitProperty = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Prepare property data
      const propertyData = {
        title: propertyForm.title,
        propertyType: propertyForm.propertyType,
        address: propertyForm.address,
        suburb: propertyForm.suburb,
        city: propertyForm.city,
        price: parseFloat(propertyForm.price),
        bedrooms: parseInt(propertyForm.bedrooms),
        bathrooms: parseInt(propertyForm.bathrooms),
        description: propertyForm.description,
        amenities: propertyForm.amenities,
        availableDate: propertyForm.availableDate,
        images: [],
        landlordId: user.uid,
        createdAt: new Date().toISOString(),
        status: 'Available'
      };

      console.log("Adding property:", propertyData);
      
      // Add property to Firestore
      const result = await addProperty(user.uid, propertyData);
      console.log("Add property result:", result);

      if (result.success) {
        // Upload images if any
        let imageUrls = [];
        if (uploadedImages.length > 0) {
          console.log("Uploading images...");
          const uploadResult = await uploadMultipleImages(result.propertyId, uploadedImages);
          console.log("Upload result:", uploadResult);
          if (uploadResult.success) {
            imageUrls = uploadResult.imageUrls;
            // Update property with image URLs
            await updateProperty(result.propertyId, { images: imageUrls });
          }
        }

        alert('Property added successfully!');
        setShowAddProperty(false);
        
        // Reset form
        setPropertyForm({
          title: "",
          propertyType: "",
          address: "",
          suburb: "",
          city: "",
          price: "",
          bedrooms: "",
          bathrooms: "",
          description: "",
          amenities: [],
          availableDate: "",
          images: []
        });
        setUploadedImages([]);

        // Reload properties
        loadData();
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error adding property:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProperty = async (propertyId) => {
    if (!confirm('Are you sure you want to delete this property?')) {
      return;
    }

    try {
      const result = await deleteProperty(propertyId);
      if (result.success) {
        alert('Property deleted successfully!');
        loadData();
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error deleting property:', error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleApplicationAction = async (applicationId, status) => {
    try {
      const result = await updateApplicationStatus(applicationId, status);
      if (result.success) {
        alert(`Application ${status.toLowerCase()} successfully!`);
        loadData();
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error updating application:', error);
      alert(`Error: ${error.message}`);
    }
  };

  // Calculate stats
  const totalProperties = properties.length;
  const activeApplications = applications.filter(app => app.status === 'Pending').length;
  const totalViews = properties.reduce((sum, prop) => sum + (prop.views || 0), 0);
  const monthlyRevenue = properties
    .filter(prop => prop.status === 'Occupied')
    .reduce((sum, prop) => sum + (prop.price || 0), 0);

  // Show loading state while checking auth or loading data
  if (authLoading || loading || !authChecked) {
    return (
      <Layout>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f9fafb'
        }}>
          <Loader style={{ 
            animation: 'spin 1s linear infinite', 
            height: '48px', 
            width: '48px', 
            color: '#1e3a8a' 
          }} />
          <span style={{ marginLeft: '16px', color: '#6b7280' }}>
            Loading dashboard...
          </span>
        </div>
      </Layout>
    );
  }

  // If no user, don't render anything (redirect will happen)
  if (!user) {
    return null;
  }

  return (
    <Layout>
      <div style={{ backgroundColor: '#f9fafb', minHeight: '100vh', paddingTop: '96px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 20px' }}>
          {/* Header with Logout */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '40px',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div>
              <h1 style={{
                fontSize: '32px',
                fontWeight: '900',
                color: '#111827',
                marginBottom: '12px'
              }}>
                Welcome back, {userData?.name || 'Landlord'}!
              </h1>
              <p style={{ fontSize: '16px', color: '#6b7280' }}>
                Manage your properties and applications
              </p>
            </div>
            <button
              onClick={logout}
              style={{
                padding: '12px 24px',
                backgroundColor: '#dc2626',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#b91c1c'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
            >
              <LogOut style={{ height: '16px', width: '16px' }} />
              Logout
            </button>
          </div>

          {/* Stats Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px',
            marginBottom: '40px'
          }}>
            {[
              { icon: Building, label: 'Total Properties', value: totalProperties, color: '#1e3a8a', bg: '#dbeafe' },
              { icon: Users, label: 'Active Applications', value: activeApplications, color: '#16a34a', bg: '#dcfce7' },
              { icon: Eye, label: 'Total Views', value: totalViews, color: '#f59e0b', bg: '#fef3c7' },
              { icon: DollarSign, label: 'Monthly Revenue', value: `R${monthlyRevenue.toLocaleString()}`, color: '#8b5cf6', bg: '#ede9fe' }
            ].map((stat, i) => (
              <div key={i} style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: stat.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px'
                }}>
                  <stat.icon style={{ height: '24px', width: '24px', color: stat.color }} />
                </div>
                <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>
                  {stat.label}
                </p>
                <p style={{ fontSize: '28px', fontWeight: '800', color: '#111827' }}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Navigation Tabs */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '8px',
            marginBottom: '32px',
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
          }}>
            {[
              { id: 'overview', label: 'Overview', icon: Home },
              { id: 'properties', label: 'My Properties', icon: Building },
              { id: 'applications', label: 'Applications', icon: Users },
              { id: 'messages', label: 'Messages', icon: MessageSquare }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: '1',
                  minWidth: '150px',
                  padding: '12px 20px',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backgroundColor: activeTab === tab.id ? '#1e3a8a' : 'transparent',
                  color: activeTab === tab.id ? '#ffffff' : '#6b7280',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <tab.icon style={{ height: '18px', width: '18px' }} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content Area */}
          {activeTab === 'overview' && (
            <div>
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                padding: '32px',
                marginBottom: '24px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
              }}>
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#111827',
                  marginBottom: '24px'
                }}>
                  Recent Activity
                </h2>
                {properties.length === 0 && applications.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
                    <Building style={{ height: '64px', width: '64px', margin: '0 auto 20px', color: '#9ca3af' }} />
                    <p style={{ fontSize: '16px', marginBottom: '12px' }}>No activity yet</p>
                    <p style={{ fontSize: '14px' }}>Add your first property to get started!</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {applications.slice(0, 3).map((app, i) => (
                      <div key={i} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        padding: '16px',
                        backgroundColor: '#f9fafb',
                        borderRadius: '12px'
                      }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '10px',
                          backgroundColor: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Users style={{ height: '20px', width: '20px', color: '#16a34a' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: '15px', color: '#111827', fontWeight: '600' }}>
                            New application for {app.property?.title || 'Property'}
                          </p>
                          <p style={{ fontSize: '13px', color: '#9ca3af', marginTop: '4px' }}>
                            From {app.student?.name || 'Student'} • {app.student?.university || ''}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'properties' && (
            <div>
              {/* Add Property Button */}
              <button
                onClick={() => setShowAddProperty(true)}
                style={{
                  padding: '14px 28px',
                  background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  marginBottom: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <Plus style={{ height: '20px', width: '20px' }} />
                Add New Property
              </button>

              {/* Properties List */}
              {properties.length === 0 ? (
                <div style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  padding: '60px 20px',
                  textAlign: 'center',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
                }}>
                  <Building style={{ height: '64px', width: '64px', color: '#9ca3af', margin: '0 auto 20px' }} />
                  <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', marginBottom: '12px' }}>
                    No properties yet
                  </h3>
                  <p style={{ fontSize: '15px', color: '#6b7280' }}>
                    Click "Add New Property" to list your first property
                  </p>
                </div>
              ) : (
                <div style={{ display: 'grid', gap: '24px' }}>
                  {properties.map((property) => (
                    <div key={property.id} style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '16px',
                      padding: '24px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                      border: '1px solid #e5e7eb'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                        <div>
                          <h3 style={{
                            fontSize: '20px',
                            fontWeight: '700',
                            color: '#111827',
                            marginBottom: '8px'
                          }}>
                            {property.title}
                          </h3>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b7280', fontSize: '14px' }}>
                            <MapPin style={{ height: '16px', width: '16px' }} />
                            {property.address}, {property.suburb}
                          </div>
                        </div>
                        <span style={{
                          padding: '6px 12px',
                          borderRadius: '20px',
                          fontSize: '13px',
                          fontWeight: '600',
                          backgroundColor: property.status === 'Available' ? '#dcfce7' : '#fee2e2',
                          color: property.status === 'Available' ? '#166534' : '#991b1b'
                        }}>
                          {property.status}
                        </span>
                      </div>

                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                        gap: '16px',
                        marginBottom: '20px'
                      }}>
                        <div>
                          <p style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '4px' }}>Price</p>
                          <p style={{ fontSize: '18px', fontWeight: '700', color: '#16a34a' }}>
                            R{property.price?.toLocaleString()}/mo
                          </p>
                        </div>
                        <div>
                          <p style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '4px' }}>Bedrooms</p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Bed style={{ height: '16px', width: '16px', color: '#6b7280' }} />
                            <p style={{ fontSize: '16px', fontWeight: '600', color: '#111827' }}>{property.bedrooms}</p>
                          </div>
                        </div>
                        <div>
                          <p style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '4px' }}>Bathrooms</p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Bath style={{ height: '16px', width: '16px', color: '#6b7280' }} />
                            <p style={{ fontSize: '16px', fontWeight: '600', color: '#111827' }}>{property.bathrooms}</p>
                          </div>
                        </div>
                        <div>
                          <p style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '4px' }}>Applications</p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Users style={{ height: '16px', width: '16px', color: '#6b7280' }} />
                            <p style={{ fontSize: '16px', fontWeight: '600', color: '#111827' }}>{property.applications || 0}</p>
                          </div>
                        </div>
                        <div>
                          <p style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '4px' }}>Views</p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Eye style={{ height: '16px', width: '16px', color: '#6b7280' }} />
                            <p style={{ fontSize: '16px', fontWeight: '600', color: '#111827' }}>{property.views || 0}</p>
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <button
                          onClick={() => handleDeleteProperty(property.id)}
                          style={{
                            padding: '10px 20px',
                            backgroundColor: '#fee2e2',
                            color: '#dc2626',
                            border: 'none',
                            borderRadius: '10px',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                        >
                          <Trash2 style={{ height: '16px', width: '16px' }} />
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'applications' && (
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '32px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
            }}>
              <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', marginBottom: '24px' }}>
                Applications
              </h2>
              {applications.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
                  <Users style={{ height: '64px', width: '64px', margin: '0 auto 20px', color: '#9ca3af' }} />
                  <p style={{ fontSize: '16px', marginBottom: '12px' }}>No applications yet</p>
                  <p style={{ fontSize: '14px' }}>Applications from students will appear here</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {applications.map((app) => (
                    <div key={app.id} style={{
                      padding: '20px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '16px'
                    }}>
                      <div>
                        <p style={{ fontSize: '16px', fontWeight: '700', color: '#111827', marginBottom: '4px' }}>
                          {app.student?.name || 'Student'}
                        </p>
                        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>
                          {app.property?.title || 'Property'}
                        </p>
                        <div style={{ display: 'flex', gap: '12px', fontSize: '13px', color: '#9ca3af' }}>
                          <span>{app.student?.university || ''}</span>
                          <span>•</span>
                          <span>{app.student?.email || ''}</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {app.status === 'Pending' ? (
                          <>
                            <button
                              onClick={() => handleApplicationAction(app.id, 'Approved')}
                              style={{
                                padding: '8px 16px',
                                backgroundColor: '#16a34a',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '14px',
                                fontWeight: '600',
                                cursor: 'pointer'
                              }}
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleApplicationAction(app.id, 'Declined')}
                              style={{
                                padding: '8px 16px',
                                backgroundColor: '#dc2626',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '14px',
                                fontWeight: '600',
                                cursor: 'pointer'
                              }}
                            >
                              Decline
                            </button>
                          </>
                        ) : (
                          <span style={{
                            padding: '8px 16px',
                            backgroundColor: app.status === 'Approved' ? '#dcfce7' : '#fee2e2',
                            color: app.status === 'Approved' ? '#166534' : '#991b1b',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: '600'
                          }}>
                            {app.status}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'messages' && (
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '32px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
              textAlign: 'center'
            }}>
              <MessageSquare style={{ height: '64px', width: '64px', color: '#9ca3af', margin: '0 auto 20px' }} />
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', marginBottom: '12px' }}>
                Coming Soon
              </h3>
              <p style={{ fontSize: '15px', color: '#6b7280' }}>
                Messaging feature will be available soon
              </p>
            </div>
          )}
        </div>

        {/* Add Property Modal */}
        {showAddProperty && (
          <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
            overflowY: 'auto'
          }} onClick={() => !submitting && setShowAddProperty(false)}>
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              maxWidth: '800px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              position: 'relative',
              margin: '20px'
            }} onClick={(e) => e.stopPropagation()}>
              {/* Modal Header */}
              <div style={{
                position: 'sticky',
                top: 0,
                backgroundColor: '#ffffff',
                padding: '24px',
                borderBottom: '2px solid #e5e7eb',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 10
              }}>
                <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#111827' }}>
                  Add New Property
                </h2>
                <button
                  onClick={() => !submitting && setShowAddProperty(false)}
                  disabled={submitting}
                  style={{
                    background: '#f3f4f6',
                    border: 'none',
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    padding: '10px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <X style={{ height: '20px', width: '20px', color: '#6b7280' }} />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSubmitProperty} style={{ padding: '24px' }}>
                {/* Property Title */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Property Title *
                  </label>
                  <input
                    type="text"
                    value={propertyForm.title}
                    onChange={(e) => setPropertyForm({...propertyForm, title: e.target.value})}
                    placeholder="e.g., Modern Studio near UCT"
                    required
                    disabled={submitting}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '15px',
                      outline: 'none'
                    }}
                  />
                </div>

                {/* Property Type */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Property Type *
                  </label>
                  <select
                    value={propertyForm.propertyType}
                    onChange={(e) => setPropertyForm({...propertyForm, propertyType: e.target.value})}
                    required
                    disabled={submitting}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '15px',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="">Select property type</option>
                    {propertyTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Address Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '20px',
                  marginBottom: '20px'
                }}>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '8px'
                    }}>
                      Street Address *
                    </label>
                    <input
                      type="text"
                      value={propertyForm.address}
                      onChange={(e) => setPropertyForm({...propertyForm, address: e.target.value})}
                      placeholder="e.g., 15 Main Road"
                      required
                      disabled={submitting}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #e5e7eb',
                        borderRadius: '10px',
                        fontSize: '15px',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '20px',
                  marginBottom: '20px'
                }}>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '8px'
                    }}>
                      Suburb *
                    </label>
                    <input
                      type="text"
                      value={propertyForm.suburb}
                      onChange={(e) => setPropertyForm({...propertyForm, suburb: e.target.value})}
                      placeholder="e.g., Rondebosch"
                      required
                      disabled={submitting}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #e5e7eb',
                        borderRadius: '10px',
                        fontSize: '15px',
                        outline: 'none'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '8px'
                    }}>
                      City *
                    </label>
                    <input
                      type="text"
                      value={propertyForm.city}
                      onChange={(e) => setPropertyForm({...propertyForm, city: e.target.value})}
                      placeholder="e.g., Cape Town"
                      required
                      disabled={submitting}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #e5e7eb',
                        borderRadius: '10px',
                        fontSize: '15px',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                {/* Price and Rooms Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '20px',
                  marginBottom: '20px'
                }}>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '8px'
                    }}>
                      Monthly Rent (R) *
                    </label>
                    <input
                      type="number"
                      value={propertyForm.price}
                      onChange={(e) => setPropertyForm({...propertyForm, price: e.target.value})}
                      placeholder="4500"
                      required
                      disabled={submitting}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #e5e7eb',
                        borderRadius: '10px',
                        fontSize: '15px',
                        outline: 'none'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '8px'
                    }}>
                      Bedrooms *
                    </label>
                    <input
                      type="number"
                      value={propertyForm.bedrooms}
                      onChange={(e) => setPropertyForm({...propertyForm, bedrooms: e.target.value})}
                      placeholder="1"
                      required
                      min="0"
                      disabled={submitting}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #e5e7eb',
                        borderRadius: '10px',
                        fontSize: '15px',
                        outline: 'none'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '8px'
                    }}>
                      Bathrooms *
                    </label>
                    <input
                      type="number"
                      value={propertyForm.bathrooms}
                      onChange={(e) => setPropertyForm({...propertyForm, bathrooms: e.target.value})}
                      placeholder="1"
                      required
                      min="0"
                      disabled={submitting}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #e5e7eb',
                        borderRadius: '10px',
                        fontSize: '15px',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                {/* Available Date */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Available From *
                  </label>
                  <input
                    type="date"
                    value={propertyForm.availableDate}
                    onChange={(e) => setPropertyForm({...propertyForm, availableDate: e.target.value})}
                    required
                    disabled={submitting}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '15px',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  />
                </div>

                {/* Amenities */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '12px'
                  }}>
                    Amenities
                  </label>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                    gap: '12px'
                  }}>
                    {amenitiesList.map(amenity => (
                      <button
                        key={amenity}
                        type="button"
                        onClick={() => handleAmenityToggle(amenity)}
                        disabled={submitting}
                        style={{
                          padding: '10px',
                          border: '2px solid',
                          borderColor: propertyForm.amenities.includes(amenity) ? '#1e3a8a' : '#e5e7eb',
                          borderRadius: '10px',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: submitting ? 'not-allowed' : 'pointer',
                          backgroundColor: propertyForm.amenities.includes(amenity) ? '#dbeafe' : '#ffffff',
                          color: propertyForm.amenities.includes(amenity) ? '#1e3a8a' : '#6b7280',
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px'
                        }}
                      >
                        {propertyForm.amenities.includes(amenity) && (
                          <Check style={{ height: '16px', width: '16px' }} />
                        )}
                        {amenity}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Description *
                  </label>
                  <textarea
                    value={propertyForm.description}
                    onChange={(e) => setPropertyForm({...propertyForm, description: e.target.value})}
                    placeholder="Describe your property..."
                    required
                    rows={4}
                    disabled={submitting}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '15px',
                      outline: 'none',
                      resize: 'vertical',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>

                {/* Image Upload */}
                <div style={{ marginBottom: '32px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Property Images (Optional)
                  </label>
                  <label htmlFor="image-upload" style={{
                    display: 'block',
                    border: '2px dashed #e5e7eb',
                    borderRadius: '12px',
                    padding: '40px',
                    textAlign: 'center',
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => !submitting && (e.currentTarget.style.borderColor = '#1e3a8a')}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}>
                    <Upload style={{ height: '48px', width: '48px', color: '#9ca3af', margin: '0 auto 16px' }} />
                    <p style={{ fontSize: '15px', color: '#6b7280', marginBottom: '8px' }}>
                      {uploadedImages.length > 0 ? `${uploadedImages.length} file(s) selected` : 'Click to upload or drag and drop'}
                    </p>
                    <p style={{ fontSize: '13px', color: '#9ca3af' }}>
                      PNG, JPG up to 10MB each
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      disabled={submitting}
                      style={{ display: 'none' }}
                      id="image-upload"
                    />
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: submitting ? 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)' : 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '700',
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px'
                  }}
                  onMouseEnter={(e) => !submitting && (e.currentTarget.style.transform = 'translateY(-2px)')}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  {submitting ? (
                    <>
                      <Loader style={{ animation: 'spin 1s linear infinite', height: '20px', width: '20px' }} />
                      Adding Property...
                    </>
                  ) : (
                    'Add Property'
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </Layout>
  );
}