"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Layout from "../../components/Layout";
import { useAuth } from "../../contexts/AuthContext";
import {
  getAvailableProperties,
  getSavedProperties,
  getStudentApplications,
  saveProperty,
  unsaveProperty,
  isPropertySaved
} from "../../firebase/database";
import {
  Home,
  Heart,
  FileText,
  MessageSquare,
  User,
  Search,
  MapPin,
  Bed,
  Bath,
  DollarSign,
  Calendar,
  Shield,
  Clock,
  Check,
  X,
  Eye,
  ExternalLink,
  TrendingUp,
  Bell,
  LogOut,
  Loader
} from "lucide-react";

export default function StudentDashboard() {
  const router = useRouter();
  const { user, userData, loading: authLoading, logout, isStudent } = useAuth();
  
  const [activeTab, setActiveTab] = useState("overview");
  const [savedProperties, setSavedProperties] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Redirect if not authenticated or not a student
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/signin');
    } else if (!authLoading && userData && !isStudent) {
      router.push('/landlord-dashboard');
    }
  }, [user, userData, authLoading, isStudent, router]);

  // Load data
  useEffect(() => {
    if (user && isStudent) {
      loadData();
    }
  }, [user, isStudent]);

  const loadData = async () => {
    setLoading(true);
    try {
      // Load saved properties
      const savedResult = await getSavedProperties(user.uid);
      if (savedResult.success) {
        setSavedProperties(savedResult.properties);
      }

      // Load applications
      const applicationsResult = await getStudentApplications(user.uid);
      if (applicationsResult.success) {
        setApplications(applicationsResult.applications);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnsaveProperty = async (propertyId) => {
    try {
      const result = await unsaveProperty(user.uid, propertyId);
      if (result.success) {
        // Remove from local state
        setSavedProperties(savedProperties.filter(p => p.id !== propertyId));
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error unsaving property:', error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleFindMore = () => {
    router.push('/find-housing');
  };

  // Calculate stats
  const totalSaved = savedProperties.length;
  const activeApplications = applications.filter(app => app.status === 'Pending').length;
  const totalViewed = 15; // This would come from a views tracking system
  const unreadMessages = 0; // This would come from messaging system

  if (authLoading || loading) {
    return (
      <Layout>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f9fafb'
        }}>
          <Loader style={{ animation: 'spin 1s linear infinite', height: '48px', width: '48px', color: '#1e3a8a' }} />
        </div>
      </Layout>
    );
  }

  if (!user || !isStudent) {
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
                Welcome back, {userData?.name || 'Student'}!
              </h1>
              <p style={{ fontSize: '16px', color: '#6b7280' }}>
                Track your housing search and applications
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
              { icon: Heart, label: 'Saved Properties', value: totalSaved, color: '#dc2626', bg: '#fee2e2' },
              { icon: FileText, label: 'Active Applications', value: activeApplications, color: '#16a34a', bg: '#dcfce7' },
              { icon: Eye, label: 'Properties Viewed', value: totalViewed, color: '#f59e0b', bg: '#fef3c7' },
              { icon: MessageSquare, label: 'Unread Messages', value: unreadMessages, color: '#1e3a8a', bg: '#dbeafe' }
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
              { id: 'saved', label: 'Saved Properties', icon: Heart },
              { id: 'applications', label: 'Applications', icon: FileText },
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
              {/* Recent Activity */}
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
                {applications.length === 0 && savedProperties.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
                    <Home style={{ height: '64px', width: '64px', margin: '0 auto 20px', color: '#9ca3af' }} />
                    <p style={{ fontSize: '16px', marginBottom: '12px' }}>No activity yet</p>
                    <p style={{ fontSize: '14px', marginBottom: '20px' }}>Start by finding properties!</p>
                    <button
                      onClick={handleFindMore}
                      style={{
                        padding: '12px 24px',
                        backgroundColor: '#1e3a8a',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '10px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <Search style={{ height: '16px', width: '16px' }} />
                      Find Properties
                    </button>
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
                          <FileText style={{ height: '20px', width: '20px', color: app.status === 'Approved' ? '#16a34a' : '#1e3a8a' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: '15px', color: '#111827', fontWeight: '600' }}>
                            Application {app.status === 'Approved' ? 'approved' : 'submitted'} for {app.property?.title || 'Property'}
                          </p>
                          <p style={{ fontSize: '13px', color: '#9ca3af', marginTop: '4px' }}>
                            {app.property?.address || ''} • Status: {app.status}
                          </p>
                        </div>
                      </div>
                    ))}
                    {savedProperties.slice(0, 2).map((prop, i) => (
                      <div key={`saved-${i}`} style={{
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
                          <Heart style={{ height: '20px', width: '20px', color: '#dc2626' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: '15px', color: '#111827', fontWeight: '600' }}>
                            Saved {prop.title}
                          </p>
                          <p style={{ fontSize: '13px', color: '#9ca3af', marginTop: '4px' }}>
                            {prop.address}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'saved' && (
            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px',
                flexWrap: 'wrap',
                gap: '16px'
              }}>
                <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#111827' }}>
                  Saved Properties ({savedProperties.length})
                </h2>
                <button
                  onClick={handleFindMore}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#1e3a8a',
                    color: '#ffffff',
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
                  <Search style={{ height: '16px', width: '16px' }} />
                  Find More
                </button>
              </div>

              {savedProperties.length === 0 ? (
                <div style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  padding: '60px 20px',
                  textAlign: 'center',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
                }}>
                  <Heart style={{ height: '64px', width: '64px', color: '#9ca3af', margin: '0 auto 20px' }} />
                  <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', marginBottom: '12px' }}>
                    No saved properties yet
                  </h3>
                  <p style={{ fontSize: '15px', color: '#6b7280', marginBottom: '24px' }}>
                    Browse available properties and save your favorites
                  </p>
                  <button
                    onClick={handleFindMore}
                    style={{
                      padding: '12px 24px',
                      backgroundColor: '#1e3a8a',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '10px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <Search style={{ height: '16px', width: '16px' }} />
                    Find Properties
                  </button>
                </div>
              ) : (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                  gap: '24px'
                }}>
                  {savedProperties.map((property) => (
                    <div key={property.id} style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                      border: '1px solid #e5e7eb',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                      {/* Image Placeholder */}
                      <div style={{
                        position: 'relative',
                        height: '220px',
                        backgroundColor: '#e5e7eb',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {property.images && property.images[0] ? (
                          <img src={property.images[0]} alt={property.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <Home style={{ height: '48px', width: '48px', color: '#9ca3af' }} />
                        )}
                        <div style={{
                          position: 'absolute',
                          top: '12px',
                          left: '12px',
                          backgroundColor: '#16a34a',
                          color: '#ffffff',
                          padding: '6px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          <Shield style={{ height: '14px', width: '14px' }} />
                          Verified
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUnsaveProperty(property.id);
                          }}
                          style={{
                            position: 'absolute',
                            top: '12px',
                            right: '12px',
                            backgroundColor: '#ffffff',
                            border: 'none',
                            borderRadius: '50%',
                            width: '36px',
                            height: '36px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                          }}
                        >
                          <Heart style={{ height: '18px', width: '18px', color: '#dc2626', fill: '#dc2626' }} />
                        </button>
                      </div>

                      {/* Content */}
                      <div style={{ padding: '20px' }}>
                        <h3 style={{
                          fontSize: '18px',
                          fontWeight: '700',
                          color: '#111827',
                          marginBottom: '8px'
                        }}>
                          {property.title}
                        </h3>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          color: '#6b7280',
                          fontSize: '14px',
                          marginBottom: '16px'
                        }}>
                          <MapPin style={{ height: '16px', width: '16px' }} />
                          {property.address}, {property.suburb}
                        </div>

                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          paddingTop: '16px',
                          borderTop: '1px solid #e5e7eb'
                        }}>
                          <div style={{ display: 'flex', gap: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', color: '#6b7280' }}>
                              <Bed style={{ height: '16px', width: '16px' }} />
                              {property.bedrooms}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', color: '#6b7280' }}>
                              <Bath style={{ height: '16px', width: '16px' }} />
                              {property.bathrooms}
                            </div>
                          </div>
                          <p style={{
                            fontSize: '20px',
                            fontWeight: '800',
                            color: '#16a34a'
                          }}>
                            R{property.price?.toLocaleString()}
                          </p>
                        </div>

                        <button style={{
                          width: '100%',
                          marginTop: '16px',
                          padding: '12px',
                          backgroundColor: '#1e3a8a',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '10px',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px'
                        }}>
                          View Details
                          <ExternalLink style={{ height: '16px', width: '16px' }} />
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
                My Applications
              </h2>
              {applications.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
                  <FileText style={{ height: '64px', width: '64px', margin: '0 auto 20px', color: '#9ca3af' }} />
                  <p style={{ fontSize: '16px', marginBottom: '12px' }}>No applications yet</p>
                  <p style={{ fontSize: '14px', marginBottom: '20px' }}>Apply to properties to track your applications here</p>
                  <button
                    onClick={handleFindMore}
                    style={{
                      padding: '12px 24px',
                      backgroundColor: '#1e3a8a',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '10px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <Search style={{ height: '16px', width: '16px' }} />
                    Find Properties
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {applications.map((app) => (
                    <div key={app.id} style={{
                      padding: '24px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px'
                    }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'start',
                        marginBottom: '16px',
                        flexWrap: 'wrap',
                        gap: '12px'
                      }}>
                        <div style={{ flex: 1 }}>
                          <h3 style={{
                            fontSize: '18px',
                            fontWeight: '700',
                            color: '#111827',
                            marginBottom: '6px'
                          }}>
                            {app.property?.title || 'Property'}
                          </h3>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            color: '#6b7280',
                            fontSize: '14px',
                            marginBottom: '8px'
                          }}>
                            <MapPin style={{ height: '16px', width: '16px' }} />
                            {app.property?.address || ''}, {app.property?.suburb || ''}
                          </div>
                          <p style={{ fontSize: '14px', color: '#9ca3af' }}>
                            Landlord contact available after approval
                          </p>
                        </div>
                        <span style={{
                          padding: '8px 16px',
                          borderRadius: '20px',
                          fontSize: '13px',
                          fontWeight: '600',
                          backgroundColor: app.status === 'Approved' ? '#dcfce7' : app.status === 'Declined' ? '#fee2e2' : '#fef3c7',
                          color: app.status === 'Approved' ? '#166534' : app.status === 'Declined' ? '#991b1b' : '#f59e0b'
                        }}>
                          {app.status}
                        </span>
                      </div>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '13px',
                        color: '#9ca3af',
                        marginBottom: '16px'
                      }}>
                        <Calendar style={{ height: '14px', width: '14px' }} />
                        Applied on {app.submittedAt ? new Date(app.submittedAt.seconds * 1000).toLocaleDateString('en-ZA') : 'Recently'}
                      </div>

                      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <button style={{
                          padding: '10px 20px',
                          backgroundColor: '#f3f4f6',
                          color: '#111827',
                          border: 'none',
                          borderRadius: '10px',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}>
                          <Eye style={{ height: '16px', width: '16px' }} />
                          View Property
                        </button>
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
              <p style={{ fontSize: '15px', color: '#6b7280', marginBottom: '24px' }}>
                Messaging feature will be available soon
              </p>
              <button
                onClick={handleFindMore}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#1e3a8a',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Search style={{ height: '16px', width: '16px' }} />
                Find Properties
              </button>
            </div>
          )}
        </div>
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