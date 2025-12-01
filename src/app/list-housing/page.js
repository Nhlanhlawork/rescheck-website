"use client";

import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { 
  Home, 
  FileText, 
  BarChart3,
  CheckCircle,
  Star,
  Eye,
  DollarSign,
  Clock,
  Users,
  MapPin,
  Bed,
  Bath,
  Wifi,
  Car,
  Lock as LockIcon,
  TreePine,
  Coffee,
  ArrowRight,
  UserPlus,
  LogIn,
  Sparkles,
  Shield,
  Plus,
  X,
  TrendingUp
} from "lucide-react";

export default function LandlordDashboard() {
  const [activeTab, setActiveTab] = useState("properties");
  const [windowWidth, setWindowWidth] = useState(0);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    setWindowWidth(typeof window !== 'undefined' ? window.innerWidth : 0);
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sampleProperties = [
    {
      id: 1,
      title: "Modern Studio near UCT",
      location: "Rondebosch, Cape Town",
      price: 4500,
      type: "Studio",
      bedrooms: 1,
      bathrooms: 1,
      description: "A modern studio apartment with great natural light, perfect for students.",
      status: "available",
      amenities: ["WiFi", "Security", "Kitchen"],
      images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"]
    },
    {
      id: 2,
      title: "Spacious Shared House",
      location: "Hatfield, Pretoria",
      price: 3200,
      type: "Shared House",
      bedrooms: 4,
      bathrooms: 2,
      description: "Large house with garden, ideal for student groups.",
      status: "occupied",
      amenities: ["WiFi", "Parking", "Garden", "Laundry"],
      images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"]
    }
  ];

  const handleTabClick = (tab) => {
    if (tab !== "properties") {
      setShowSignUpModal(true);
    } else {
      setActiveTab(tab);
    }
  };

  const PropertyCard = ({ property }) => (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: hoveredCard === property.id 
          ? '0 25px 50px rgba(30, 58, 138, 0.2)' 
          : '0 10px 30px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        border: '2px solid',
        borderColor: hoveredCard === property.id ? '#1e3a8a' : 'transparent',
        transform: hoveredCard === property.id ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
        position: 'relative'
      }}
      onMouseEnter={() => setHoveredCard(property.id)}
      onMouseLeave={() => setHoveredCard(null)}
    >
      {/* Image */}
      <div style={{ position: 'relative', overflow: 'hidden', height: '220px' }}>
        <img
          src={property.images[0]}
          alt={property.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: hoveredCard === property.id ? 'scale(1.1)' : 'scale(1)',
            transition: 'transform 0.4s ease'
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)'
        }}></div>
        
        {/* Status Badge */}
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: property.status === 'available' 
            ? 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)' 
            : 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
          color: '#ffffff',
          fontSize: '12px',
          fontWeight: '600',
          padding: '6px 12px',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
        }}>
          <CheckCircle style={{ height: '14px', width: '14px' }} />
          {property.status === 'available' ? 'Available' : 'Occupied'}
        </div>

        {/* Preview Badge */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          backgroundColor: 'rgba(30, 58, 138, 0.95)',
          backdropFilter: 'blur(10px)',
          padding: '6px 12px',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
        }}>
          <Eye style={{ height: '12px', width: '12px', color: '#fbbf24' }} />
          <span style={{ color: '#ffffff', fontSize: '11px', fontWeight: '600' }}>Preview</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
          <h3 style={{ 
            fontSize: '20px', 
            fontWeight: '700', 
            color: '#111827',
            margin: 0,
            flex: 1
          }}>
            {property.title}
          </h3>
          <div style={{
            fontSize: '24px',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: '1',
            marginLeft: '12px'
          }}>
            R{property.price}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
          <MapPin style={{ height: '16px', width: '16px', color: '#1e3a8a', flexShrink: 0 }} />
          <span style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>{property.location}</span>
        </div>

        <div style={{ 
          display: 'flex', 
          gap: '16px', 
          marginBottom: '16px',
          fontSize: '14px',
          color: '#6b7280'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Home style={{ height: '16px', width: '16px' }} />
            {property.type}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Bed style={{ height: '16px', width: '16px' }} />
            {property.bedrooms} bed
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Bath style={{ height: '16px', width: '16px' }} />
            {property.bathrooms} bath
          </div>
        </div>

        {/* Amenities */}
        <div style={{ 
          display: 'flex', 
          gap: '8px', 
          marginBottom: '16px',
          flexWrap: 'wrap'
        }}>
          {property.amenities.slice(0, 3).map((amenity, i) => (
            <span key={i} style={{
              fontSize: '12px',
              padding: '6px 12px',
              backgroundColor: '#eff6ff',
              color: '#1e40af',
              borderRadius: '8px',
              fontWeight: '600',
              border: '1px solid #bfdbfe',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              {amenity === 'WiFi' && <Wifi style={{ height: '12px', width: '12px' }} />}
              {amenity === 'Parking' && <Car style={{ height: '12px', width: '12px' }} />}
              {amenity === 'Security' && <Shield style={{ height: '12px', width: '12px' }} />}
              {amenity === 'Garden' && <TreePine style={{ height: '12px', width: '12px' }} />}
              {amenity === 'Kitchen' && <Coffee style={{ height: '12px', width: '12px' }} />}
              {amenity}
            </span>
          ))}
        </div>

        <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
          {property.description}
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{
            flex: 1,
            background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
            color: '#ffffff',
            padding: '12px 20px',
            borderRadius: '12px',
            border: 'none',
            fontSize: '14px',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: '0 4px 12px rgba(30, 58, 138, 0.3)',
            transition: 'all 0.3s ease'
          }}
          onClick={(e) => {
            e.stopPropagation();
            setShowSignUpModal(true);
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(30, 58, 138, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(30, 58, 138, 0.3)';
          }}>
            Edit Property
            <ArrowRight style={{ height: '16px', width: '16px' }} />
          </button>
          <button style={{
            padding: '12px 16px',
            backgroundColor: '#f3f4f6',
            color: '#374151',
            borderRadius: '12px',
            border: '2px solid #e5e7eb',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onClick={(e) => {
            e.stopPropagation();
            setShowSignUpModal(true);
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#1e3a8a';
            e.currentTarget.style.backgroundColor = '#eff6ff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#e5e7eb';
            e.currentTarget.style.backgroundColor = '#f3f4f6';
          }}>
            <Eye style={{ height: '16px', width: '16px' }} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', position: 'relative' }}>
        {/* Global scroll fix */}
        <style jsx global>{`
          html {
            scroll-behavior: smooth;
          }
          body {
            overflow-x: hidden;
          }
        `}</style>

        {/* Decorative Elements */}
        <div style={{
          position: 'absolute',
          top: '0',
          right: '0',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(30, 58, 138, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}></div>

        {/* Hero Section */}
        <section style={{
          position: 'relative',
          minHeight: '55vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundImage: 'url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: windowWidth < 768 ? '100px 20px 80px' : '120px 20px 100px'
        }}>
          {/* Dark Gradient Overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.95) 0%, rgba(30, 64, 175, 0.9) 50%, rgba(55, 48, 163, 0.92) 100%)',
            zIndex: 0
          }}></div>

          {/* Animated Overlay Pattern */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(251, 191, 36, 0.12) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.06) 0%, transparent 50%)
            `,
            animation: 'pulse 6s ease-in-out infinite',
            zIndex: 1
          }}></div>

          {/* Floating Decorative Elements */}
          <div style={{
            position: 'absolute',
            top: '15%',
            left: '8%',
            width: '100px',
            height: '100px',
            borderRadius: '30px',
            background: 'rgba(251, 191, 36, 0.12)',
            backdropFilter: 'blur(10px)',
            transform: 'rotate(20deg)',
            animation: 'float 8s ease-in-out infinite',
            zIndex: 1
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '20%',
            right: '10%',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(10px)',
            animation: 'float 10s ease-in-out infinite 2s',
            zIndex: 1
          }}></div>

          <div style={{
            maxWidth: '1100px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 2,
            textAlign: 'center'
          }}>
            {/* Preview Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: 'rgba(251, 191, 36, 0.25)',
              backdropFilter: 'blur(20px)',
              padding: '12px 28px',
              borderRadius: '50px',
              marginBottom: '32px',
              border: '2px solid rgba(251, 191, 36, 0.4)',
              boxShadow: '0 8px 32px rgba(251, 191, 36, 0.25)',
              animation: 'slideDown 0.6s ease-out'
            }}>
              <Sparkles style={{ height: '20px', width: '20px', color: '#fbbf24' }} />
              <span style={{ color: '#ffffff', fontWeight: '700', fontSize: '15px', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                Landlord Dashboard Preview
              </span>
            </div>

            <h1 style={{
              fontSize: windowWidth < 768 ? '2.5rem' : windowWidth < 1024 ? '3.5rem' : '4.5rem',
              fontWeight: '900',
              color: '#ffffff',
              marginBottom: '24px',
              lineHeight: '1.1',
              textShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
              letterSpacing: '-0.02em',
              animation: 'fadeInUp 0.8s ease-out 0.2s both'
            }}>
              Manage Your
              <span style={{ 
                display: 'block',
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginTop: '12px',
                filter: 'drop-shadow(0 4px 12px rgba(251, 191, 36, 0.3))'
              }}>Properties</span>
            </h1>

            <p style={{
              fontSize: windowWidth < 768 ? '1.15rem' : '1.35rem',
              color: '#e0e7ff',
              maxWidth: '750px',
              margin: '0 auto 40px',
              lineHeight: '1.7',
              fontWeight: '500',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
              animation: 'fadeInUp 0.8s ease-out 0.4s both'
            }}>
              List your properties, manage applications, and track your success all in one place
            </p>

            {/* CTA Button */}
            <button
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 32px',
                background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '50px',
                fontSize: '18px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(22, 163, 74, 0.4)',
                transition: 'all 0.3s ease',
                animation: 'fadeInUp 0.8s ease-out 0.6s both'
              }}
              onClick={() => setShowSignUpModal(true)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(22, 163, 74, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(22, 163, 74, 0.4)';
              }}
            >
              <Plus style={{ height: '22px', width: '22px' }} />
              List Your First Property
            </button>
          </div>
        </section>

        {/* Navigation Tabs */}
        <div style={{
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          position: 'sticky',
          top: 0,
          zIndex: 40,
          borderBottom: '2px solid #f3f4f6'
        }}>
          <div style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            gap: '4px',
            overflowX: 'auto',
            padding: '0 20px'
          }}>
            <button
              style={{
                padding: '20px 32px',
                border: 'none',
                background: 'transparent',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                color: activeTab === 'properties' ? '#1e3a8a' : '#6b7280',
                borderBottom: activeTab === 'properties' ? '3px solid #1e3a8a' : '3px solid transparent',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                whiteSpace: 'nowrap'
              }}
              onClick={() => handleTabClick('properties')}
            >
              <Home style={{ height: '20px', width: '20px' }} />
              My Properties
            </button>
            <button
              style={{
                padding: '20px 32px',
                border: 'none',
                background: 'transparent',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                color: '#6b7280',
                borderBottom: '3px solid transparent',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                whiteSpace: 'nowrap',
                position: 'relative'
              }}
              onClick={() => handleTabClick('applications')}
              onMouseEnter={(e) => e.currentTarget.style.color = '#1e3a8a'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
            >
              <FileText style={{ height: '20px', width: '20px' }} />
              Applications
              <div style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#fbbf24',
                border: '2px solid #ffffff'
              }}></div>
            </button>
            <button
              style={{
                padding: '20px 32px',
                border: 'none',
                background: 'transparent',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                color: '#6b7280',
                borderBottom: '3px solid transparent',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                whiteSpace: 'nowrap',
                position: 'relative'
              }}
              onClick={() => handleTabClick('analytics')}
              onMouseEnter={(e) => e.currentTarget.style.color = '#1e3a8a'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
            >
              <BarChart3 style={{ height: '20px', width: '20px' }} />
              Analytics
              <div style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#fbbf24',
                border: '2px solid #ffffff'
              }}></div>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: windowWidth < 768 ? '40px 20px' : '60px 20px'
        }}>
          {/* My Properties Section */}
          <div style={{ marginBottom: '60px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '40px',
              flexWrap: 'wrap',
              gap: '20px'
            }}>
              <h2 style={{
                fontSize: windowWidth < 768 ? '2rem' : '2.5rem',
                fontWeight: '800',
                background: 'linear-gradient(135deg, #111827 0%, #1e3a8a 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                margin: 0
              }}>
                My Properties
              </h2>
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '14px 28px',
                  background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '15px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(30, 58, 138, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => setShowSignUpModal(true)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(30, 58, 138, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(30, 58, 138, 0.3)';
                }}
              >
                <Plus style={{ height: '20px', width: '20px' }} />
                Add Property
              </button>
            </div>

            {/* Property Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: windowWidth < 640 ? '1fr' : windowWidth < 1024 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
              gap: '32px'
            }}>
              {sampleProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>

          {/* Benefits Section */}
          <div style={{
            marginTop: '80px',
            padding: '60px 40px',
            background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
            borderRadius: '24px',
            border: '3px solid #93c5fd'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h2 style={{
                fontSize: windowWidth < 768 ? '2rem' : '2.5rem',
                fontWeight: '800',
                color: '#1e3a8a',
                marginBottom: '16px'
              }}>
                Why List on RESCHECK?
              </h2>
              <p style={{
                fontSize: '18px',
                color: '#4b5563',
                maxWidth: '700px',
                margin: '0 auto',
                lineHeight: '1.6'
              }}>
                Join landlords who are successfully managing their student properties
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: windowWidth < 768 ? '1fr' : 'repeat(3, 1fr)',
              gap: '32px'
            }}>
              {[
                {
                  icon: Users,
                  title: 'Reach Students',
                  description: 'Connect with verified students actively searching for accommodation'
                },
                {
                  icon: Shield,
                  title: 'Verified Platform',
                  description: 'All listings are verified and students are authenticated with university emails'
                },
                {
                  icon: TrendingUp,
                  title: 'Easy Management',
                  description: 'Manage properties, applications, and communications in one dashboard'
                }
              ].map((benefit, i) => (
                <div key={i} style={{
                  backgroundColor: '#ffffff',
                  padding: '32px',
                  borderRadius: '20px',
                  textAlign: 'center',
                  boxShadow: '0 8px 24px rgba(30, 58, 138, 0.1)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 16px 40px rgba(30, 58, 138, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(30, 58, 138, 0.1)';
                }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    boxShadow: '0 4px 12px rgba(30, 58, 138, 0.2)'
                  }}>
                    <benefit.icon style={{ height: '32px', width: '32px', color: '#1e3a8a' }} />
                  </div>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#111827',
                    marginBottom: '12px'
                  }}>
                    {benefit.title}
                  </h3>
                  <p style={{
                    fontSize: '15px',
                    color: '#6b7280',
                    lineHeight: '1.6'
                  }}>
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div style={{
            marginTop: '80px',
            padding: '60px 40px',
            background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.05) 0%, rgba(30, 64, 175, 0.05) 100%)',
            borderRadius: '24px',
            border: '2px solid rgba(30, 58, 138, 0.1)',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: windowWidth < 768 ? '2rem' : '2.5rem',
              fontWeight: '800',
              color: '#1e3a8a',
              marginBottom: '20px'
            }}>
              Ready to Get Started?
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#6b7280',
              marginBottom: '40px',
              maxWidth: '700px',
              margin: '0 auto 40px',
              lineHeight: '1.6'
            }}>
              Create your landlord account and start listing your properties today
            </p>
            <button
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '18px 40px',
                background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '50px',
                fontSize: '18px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(22, 163, 74, 0.4)',
                transition: 'all 0.3s ease'
              }}
              onClick={() => setShowSignUpModal(true)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(22, 163, 74, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(22, 163, 74, 0.4)';
              }}
            >
              <UserPlus style={{ height: '22px', width: '22px' }} />
              Create Landlord Account
            </button>
          </div>
        </div>

        {/* Sign Up Modal */}
        {showSignUpModal && (
          <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50,
            padding: '20px',
            animation: 'fadeIn 0.3s ease'
          }}
          onClick={() => setShowSignUpModal(false)}>
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              maxWidth: '500px',
              width: '100%',
              padding: '40px',
              boxShadow: '0 40px 80px rgba(0, 0, 0, 0.3)',
              animation: 'slideUp 0.3s ease',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}>
              <button
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#f3f4f6',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => setShowSignUpModal(false)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#e5e7eb';
                  e.currentTarget.style.transform = 'rotate(90deg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                  e.currentTarget.style.transform = 'rotate(0deg)';
                }}
              >
                <X style={{ height: '20px', width: '20px', color: '#6b7280' }} />
              </button>

              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                  border: '4px solid #93c5fd'
                }}>
                  <UserPlus style={{ height: '40px', width: '40px', color: '#1e3a8a' }} />
                </div>

                <h2 style={{
                  fontSize: '28px',
                  fontWeight: '800',
                  color: '#111827',
                  marginBottom: '16px'
                }}>
                  Create Landlord Account
                </h2>

                <p style={{
                  fontSize: '16px',
                  color: '#6b7280',
                  marginBottom: '32px',
                  lineHeight: '1.6'
                }}>
                  Sign up to unlock full access to property management, applications, analytics, and more
                </p>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}>
                  <button style={{
                    padding: '16px',
                    background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(30, 58, 138, 0.3)',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => window.location.href = '/signup'}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(30, 58, 138, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(30, 58, 138, 0.3)';
                  }}>
                    Sign Up as Landlord
                  </button>

                  <button style={{
                    padding: '16px',
                    backgroundColor: '#ffffff',
                    color: '#374151',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => window.location.href = '/signin'}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#1e3a8a';
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.backgroundColor = '#ffffff';
                  }}>
                    Already have an account? Sign In
                  </button>
                </div>

                <p style={{
                  marginTop: '20px',
                  fontSize: '13px',
                  color: '#9ca3af',
                  textAlign: 'center',
                  lineHeight: '1.5'
                }}>
                  By signing up, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Animations */}
        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes float {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg); 
            }
            50% { 
              transform: translateY(-30px) rotate(5deg); 
            }
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes slideUp {
            from {
              transform: translateY(30px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }

          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
          }
        `}</style>
      </div>
    </Layout>
  );
}