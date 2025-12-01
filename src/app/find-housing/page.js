"use client";

import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { 
  MapPin, 
  Star, 
  Shield, 
  Wifi, 
  Car, 
  Wind,
  Users,
  X,
  Lock,
  Eye,
  Heart,
  ChevronRight,
  Filter,
  Search
} from "lucide-react";

export default function FindHousing() {
  const [viewMode, setViewMode] = useState("grid");
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    setWindowWidth(typeof window !== 'undefined' ? window.innerWidth : 0);
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Demo properties to showcase
  const demoProperties = [
    {
      id: 1,
      title: "Modern Studio Apartment",
      location: "Braamfontein, Johannesburg",
      university: "Wits University",
      distance: "0.5km",
      price: 4500,
      rating: 4.9,
      reviews: 34,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      verified: true,
      safety: 5,
      amenities: ["WiFi", "Security", "Furnished"],
      type: "Studio"
    },
    {
      id: 2,
      title: "Cozy Shared House",
      location: "Hatfield, Pretoria",
      university: "University of Pretoria",
      distance: "1.2km",
      price: 3200,
      rating: 4.7,
      reviews: 28,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      verified: true,
      safety: 4,
      amenities: ["Parking", "Kitchen", "Garden"],
      type: "Shared"
    },
    {
      id: 3,
      title: "Luxury Student Residence",
      location: "Observatory, Cape Town",
      university: "UCT",
      distance: "0.8km",
      price: 6500,
      rating: 4.8,
      reviews: 42,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      verified: true,
      safety: 5,
      amenities: ["WiFi", "Gym", "Pool"],
      type: "Residence"
    },
    {
      id: 4,
      title: "Affordable Bachelor Pad",
      location: "Stellenbosch",
      university: "Stellenbosch University",
      distance: "1.5km",
      price: 3800,
      rating: 4.6,
      reviews: 19,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      verified: true,
      safety: 4,
      amenities: ["WiFi", "Laundry", "Security"],
      type: "Bachelor"
    },
    {
      id: 5,
      title: "Spacious 2-Bedroom Flat",
      location: "Rosebank, Johannesburg",
      university: "Wits University",
      distance: "2.1km",
      price: 5200,
      rating: 4.7,
      reviews: 31,
      image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      verified: true,
      safety: 5,
      amenities: ["Parking", "WiFi", "Balcony"],
      type: "Apartment"
    },
    {
      id: 6,
      title: "Student Dorm Room",
      location: "Durban",
      university: "UKZN",
      distance: "0.3km",
      price: 2800,
      rating: 4.5,
      reviews: 45,
      image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      verified: true,
      safety: 4,
      amenities: ["Security", "Cafeteria", "Study Room"],
      type: "Dorm"
    }
  ];

  const handleInteraction = () => {
    setShowSignUpModal(true);
  };

  const PropertyCard = ({ property, index }) => (
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
        position: 'relative',
        opacity: 1
      }}
      onMouseEnter={() => setHoveredCard(property.id)}
      onMouseLeave={() => setHoveredCard(null)}
      onClick={handleInteraction}
    >
      {/* Lock Overlay */}
      <div style={{
        position: 'absolute',
        top: '12px',
        right: '12px',
        zIndex: 10,
        backgroundColor: 'rgba(30, 58, 138, 0.95)',
        backdropFilter: 'blur(10px)',
        padding: '8px 16px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
      }}>
        <Lock style={{ height: '14px', width: '14px', color: '#fbbf24' }} />
        <span style={{ color: '#ffffff', fontSize: '12px', fontWeight: '600' }}>Preview</span>
      </div>

      {/* Image */}
      <div style={{ position: 'relative', overflow: 'hidden', height: '220px' }}>
        <img
          src={property.image}
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
        
        {/* Verified Badge */}
        {property.verified && (
          <div style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
            color: '#ffffff',
            fontSize: '12px',
            fontWeight: '600',
            padding: '6px 12px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 4px 12px rgba(22, 163, 74, 0.4)'
          }}>
            <Shield style={{ height: '14px', width: '14px' }} />
            Verified
          </div>
        )}

        {/* Heart Icon */}
        <button style={{
          position: 'absolute',
          bottom: '12px',
          right: '12px',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease'
        }}
        onClick={(e) => {
          e.stopPropagation();
          handleInteraction();
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}>
          <Heart style={{ height: '20px', width: '20px', color: '#ef4444' }} />
        </button>
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
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#fef3c7',
            padding: '6px 12px',
            borderRadius: '10px',
            border: '2px solid #fde047'
          }}>
            <Star style={{ height: '16px', width: '16px', color: '#f59e0b', fill: '#f59e0b' }} />
            <span style={{ fontSize: '15px', fontWeight: '700', color: '#92400e' }}>{property.rating}</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
          <MapPin style={{ height: '16px', width: '16px', color: '#1e3a8a', flexShrink: 0 }} />
          <span style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>{property.location}</span>
        </div>

        <div style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '16px', fontWeight: '500' }}>
          {property.university} • {property.distance} away
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
              border: '1px solid #bfdbfe'
            }}>
              {amenity}
            </span>
          ))}
        </div>

        {/* Price and CTA */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          paddingTop: '16px',
          borderTop: '2px solid #f3f4f6'
        }}>
          <div>
            <div style={{ 
              fontSize: '28px', 
              fontWeight: '800',
              background: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: '1'
            }}>
              R{property.price}
            </div>
            <div style={{ fontSize: '13px', color: '#9ca3af', fontWeight: '600', marginTop: '4px' }}>
              per month
            </div>
          </div>
          <button style={{
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
            gap: '8px',
            boxShadow: '0 4px 12px rgba(30, 58, 138, 0.3)',
            transition: 'all 0.3s ease'
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleInteraction();
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(30, 58, 138, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(30, 58, 138, 0.3)';
          }}>
            View Details
            <ChevronRight style={{ height: '16px', width: '16px' }} />
          </button>
        </div>

        {/* Reviews count */}
        <div style={{ 
          marginTop: '12px',
          fontSize: '13px',
          color: '#6b7280',
          fontWeight: '500',
          textAlign: 'center'
        }}>
          {property.reviews} verified student reviews
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
          * {
            scroll-behavior: smooth;
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
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundImage: 'url(https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)',
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
              <Eye style={{ height: '20px', width: '20px', color: '#fbbf24' }} />
              <span style={{ color: '#ffffff', fontWeight: '700', fontSize: '15px', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                Preview Mode - Sign up to unlock full access
              </span>
            </div>

            <h1 style={{
              fontSize: windowWidth < 768 ? '3rem' : windowWidth < 1024 ? '4rem' : '5rem',
              fontWeight: '900',
              color: '#ffffff',
              marginBottom: '24px',
              lineHeight: '1.1',
              textShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
              letterSpacing: '-0.02em',
              animation: 'fadeInUp 0.8s ease-out 0.2s both'
            }}>
              Discover Your Perfect
              <span style={{ 
                display: 'block',
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginTop: '12px',
                filter: 'drop-shadow(0 4px 12px rgba(251, 191, 36, 0.3))'
              }}>Student Home</span>
            </h1>

            <p style={{
              fontSize: windowWidth < 768 ? '1.15rem' : '1.35rem',
              color: '#e0e7ff',
              maxWidth: '750px',
              margin: '0 auto',
              lineHeight: '1.7',
              fontWeight: '500',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
              animation: 'fadeInUp 0.8s ease-out 0.4s both'
            }}>
              Browse verified properties with safety ratings, student reviews, and all the amenities you need
            </p>
          </div>
        </section>

        {/* Quick Filters Bar */}
        <div style={{
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          padding: '24px',
          position: 'sticky',
          top: 0,
          zIndex: 40
        }}>
          <div style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(30, 58, 138, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onClick={handleInteraction}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(30, 58, 138, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(30, 58, 138, 0.3)';
              }}
            >
              <Filter style={{ height: '18px', width: '18px' }} />
              All Filters
            </button>

            {['Wits', 'UCT', 'UP', 'Stellenbosch', 'UKZN'].map((uni, i) => (
              <button
                key={i}
                style={{
                  padding: '12px 20px',
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  border: '2px solid transparent',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={handleInteraction}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#e5e7eb';
                  e.currentTarget.style.borderColor = '#1e3a8a';
                  e.currentTarget.style.color = '#1e3a8a';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.color = '#374151';
                }}
              >
                {uni}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: windowWidth < 768 ? '40px 20px' : '60px 20px'
        }}>
          {/* Section Header */}
          <div style={{ 
            marginBottom: '40px',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: windowWidth < 768 ? '2rem' : '2.5rem',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #111827 0%, #1e3a8a 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '12px'
            }}>
              Featured Properties
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#6b7280',
              fontWeight: '500'
            }}>
              Sign up to view full details and contact landlords
            </p>
          </div>

          {/* Property Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: windowWidth < 640 ? '1fr' : windowWidth < 1024 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
            gap: '32px'
          }}>
            {demoProperties.map((property, index) => (
              <PropertyCard key={property.id} property={property} index={index} />
            ))}
          </div>

          {/* Load More CTA */}
          <div style={{
            marginTop: '60px',
            textAlign: 'center',
            padding: '60px 20px',
            background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
            borderRadius: '24px',
            border: '3px solid #93c5fd'
          }}>
            <Lock style={{ 
              height: '64px', 
              width: '64px', 
              color: '#1e3a8a',
              margin: '0 auto 20px'
            }} />
            <h3 style={{
              fontSize: '28px',
              fontWeight: '800',
              color: '#1e3a8a',
              marginBottom: '16px'
            }}>
              Want to See More?
            </h3>
            <p style={{
              fontSize: '18px',
              color: '#4b5563',
              marginBottom: '32px',
              maxWidth: '600px',
              margin: '0 auto 32px',
              lineHeight: '1.6'
            }}>
              Sign up now to unlock access to thousands of verified student properties across South Africa
            </p>
            <button
              style={{
                padding: '16px 40px',
                background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '50px',
                fontSize: '18px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(30, 58, 138, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onClick={() => window.location.href = '/signup'}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(30, 58, 138, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(30, 58, 138, 0.3)';
              }}
            >
              Sign Up for Free Access
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
                  <Lock style={{ height: '40px', width: '40px', color: '#1e3a8a' }} />
                </div>

                <h2 style={{
                  fontSize: '28px',
                  fontWeight: '800',
                  color: '#111827',
                  marginBottom: '16px'
                }}>
                  Sign Up to Continue
                </h2>

                <p style={{
                  fontSize: '16px',
                  color: '#6b7280',
                  marginBottom: '32px',
                  lineHeight: '1.6'
                }}>
                  Create a free account to view full property details, contact landlords, save favorites, and access our 24/7 HRA support
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
                    Sign Up
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