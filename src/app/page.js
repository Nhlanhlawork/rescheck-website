"use client";

import { useState, useEffect } from 'react';
import Layout from "../components/Layout";
import { 
  Search, 
  MapPin, 
  Star, 
  Shield, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight, 
  Phone, 
  DollarSign, 
  Calendar, 
  Camera, 
  MessageCircle, 
  Clock, 
  Headphones,
  X,
  Sparkles
} from 'lucide-react';

export default function HomePage() {
  const [searchLocation, setSearchLocation] = useState('');
  const [isHRAOpen, setIsHRAOpen] = useState(false);
  const [hraChatMessages, setHraChatMessages] = useState([
    { sender: 'HRA', message: 'Hello! I\'m your Housing Rights Advocate. How can I help you today?', time: 'now' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(typeof window !== 'undefined' ? window.innerWidth : 0);
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const featuredProperties = [
    {
      id: '1',
      title: 'Modern Student Apartment',
      location: 'Braamfontein, Johannesburg',
      university: 'University of the Witwatersrand',
      distance: '0.8km',
      price: 4500,
      rating: 4.8,
      reviewCount: 24,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      isVerified: true,
      safetyRating: 5,
      availability: 'Available'
    },
    {
      id: '2',
      title: 'Cozy Shared House',
      location: 'Hatfield, Pretoria',
      university: 'University of Pretoria',
      distance: '1.2km',
      price: 3200,
      rating: 4.6,
      reviewCount: 18,
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      isVerified: true,
      safetyRating: 4,
      availability: 'Limited'
    },
    {
      id: '3',
      title: 'Student Studio',
      location: 'Observatory, Cape Town',
      university: 'University of Cape Town',
      distance: '2.1km',
      price: 5800,
      rating: 4.7,
      reviewCount: 31,
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      isVerified: false,
      safetyRating: 4,
      availability: 'Available'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah M.',
      university: 'Wits University',
      text: 'RESCHECK helped me find the perfect place near campus. The verified student reviews were so helpful!',
      rating: 5
    },
    {
      name: 'Thabo K.',
      university: 'University of Pretoria',
      text: 'Finally, a platform that understands student needs. Great prices and verified reviews from real students.',
      rating: 5
    },
    {
      name: 'Emma L.',
      university: 'UCT',
      text: 'The safety ratings and HRA support gave me peace of mind. Highly recommend!',
      rating: 4
    }
  ];

  const stats = [
    { icon: Users, label: 'Verified Students', value: '15,000+' },
    { icon: Shield, label: 'Safety-Verified Properties', value: '2,500+' },
    { icon: Star, label: 'Average Rating', value: '4.7/5' },
    { icon: TrendingUp, label: 'Universities Covered', value: '25+' }
  ];

  const keyFeatures = [
    {
      icon: Shield,
      title: 'Verified Student Reviews',
      description: 'Only verified students can leave reviews using their university email addresses'
    },
    {
      icon: Camera,
      title: 'Photos & Videos',
      description: 'High-quality photos and video tours of every room and common area'
    },
    {
      icon: DollarSign,
      title: 'Price Comparisons',
      description: 'Compare prices across different accommodations to find the best deals'
    },
    {
      icon: MapPin,
      title: 'Accurate GPS Distance',
      description: 'Precise distance measurements from your campus using GPS technology'
    },
    {
      icon: Phone,
      title: '24/7 HRA Support',
      description: 'Professional Housing Rights Advocate available around the clock'
    },
    {
      icon: Calendar,
      title: 'Real-time Availability',
      description: 'Live updates on room availability and booking status'
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage = { sender: 'You', message: newMessage, time: 'now' };
      setHraChatMessages(prev => [...prev, userMessage]);
      
      setTimeout(() => {
        let response = '';
        if (newMessage.toLowerCase().includes('lease') || newMessage.toLowerCase().includes('contract')) {
          response = 'I can help you review your lease agreement! Please make sure to check the deposit amount, notice period, and maintenance responsibilities. Would you like me to explain any specific clauses?';
        } else if (newMessage.toLowerCase().includes('deposit') || newMessage.toLowerCase().includes('money')) {
          response = 'Regarding deposits: Landlords can request up to 2 months rent as deposit. Always get a receipt and ensure deposit conditions are clearly stated in your lease. Need help with a deposit dispute?';
        } else if (newMessage.toLowerCase().includes('safety') || newMessage.toLowerCase().includes('security')) {
          response = 'Safety is crucial! Look for properties with 24/7 security, controlled access, good lighting, and security cameras. Check our safety ratings and read student reviews about the area. Any specific safety concerns?';
        } else {
          response = 'I\'m here to help with all your housing needs! I can assist with lease agreements, tenant rights, deposit disputes, safety concerns, and more. What specific issue would you like help with?';
        }
        
        const hraResponse = { sender: 'HRA', message: response, time: 'now' };
        setHraChatMessages(prev => [...prev, hraResponse]);
      }, 1500);
      
      setNewMessage('');
    }
  };

  const handleSearch = () => {
    console.log('Searching for:', searchLocation);
  };

  const PropertyCard = ({ property }) => (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(30, 58, 138, 0.08)',
      overflow: 'hidden',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      border: '1px solid rgba(30, 58, 138, 0.08)',
      position: 'relative'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = '0 25px 50px rgba(30, 58, 138, 0.2)';
      e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
      e.currentTarget.style.borderColor = '#1e3a8a';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = '0 10px 30px rgba(30, 58, 138, 0.08)';
      e.currentTarget.style.transform = 'translateY(0) scale(1)';
      e.currentTarget.style.borderColor = 'rgba(30, 58, 138, 0.08)';
    }}>
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <img 
          src={property.image} 
          alt={property.title}
          style={{
            width: '100%',
            height: '220px',
            objectFit: 'cover',
            transition: 'transform 0.4s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%)'
        }}></div>
        <div style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          padding: '8px 14px',
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)'
        }}>
          <Star style={{ height: '18px', width: '18px', color: '#fbbf24', fill: '#fbbf24', marginRight: '6px' }} />
          <span style={{ fontSize: '15px', fontWeight: '700', color: '#111827' }}>{property.rating}</span>
        </div>
        {property.isVerified && (
          <div style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
            color: '#ffffff',
            fontSize: '13px',
            fontWeight: '600',
            padding: '6px 14px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 8px 20px rgba(22, 163, 74, 0.3)'
          }}>
            <Shield style={{ height: '14px', width: '14px', marginRight: '6px' }} />
            Verified
          </div>
        )}
      </div>
      
      <div style={{ padding: '24px' }}>
        <h3 style={{ 
          fontWeight: '700', 
          fontSize: '20px', 
          marginBottom: '12px', 
          color: '#111827',
          lineHeight: '1.3'
        }}>{property.title}</h3>
        <div style={{ display: 'flex', alignItems: 'center', color: '#4b5563', marginBottom: '10px' }}>
          <MapPin style={{ height: '18px', width: '18px', marginRight: '8px', flexShrink: 0, color: '#1e3a8a' }} />
          <span style={{ fontSize: '15px', fontWeight: '500' }}>{property.location}</span>
        </div>
        <div style={{ 
          fontSize: '14px', 
          color: '#6b7280', 
          marginBottom: '20px',
          fontWeight: '500'
        }}>
          {property.university} • {property.distance} away
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ 
            fontSize: '28px', 
            fontWeight: '800', 
            background: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            R{property.price}/mo
          </div>
          <div style={{
            padding: '6px 16px',
            borderRadius: '12px',
            fontSize: '13px',
            fontWeight: '600',
            backgroundColor: property.availability === 'Available' ? '#dcfce7' : '#fef3c7',
            color: property.availability === 'Available' ? '#166534' : '#854d0e',
            border: `2px solid ${property.availability === 'Available' ? '#86efac' : '#fde047'}`
          }}>
            {property.availability}
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button style={{
            background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
            color: '#ffffff',
            padding: '12px 24px',
            borderRadius: '12px',
            fontSize: '15px',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(30, 58, 138, 0.3)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(30, 58, 138, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(30, 58, 138, 0.3)';
          }}>
            View Details
            <ArrowRight style={{ height: '16px', width: '16px' }} />
          </button>
          <span style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>{property.reviewCount} reviews</span>
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative Background Elements */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(30, 58, 138, 0.03) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '10%',
          left: '-5%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(22, 163, 74, 0.03) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}></div>

        {/* Hero Section */}
        <section style={{
          position: 'relative',
          minHeight: '85vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}>
          {/* Animated Background */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            animation: 'subtle-zoom 20s ease-in-out infinite alternate'
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.92) 0%, rgba(30, 64, 175, 0.88) 35%, rgba(55, 48, 163, 0.9) 100%)'
            }}></div>
            {/* Animated Overlay Pattern */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `
                radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)
              `
            }}></div>
          </div>

          {/* Floating Elements */}
          <div style={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: '80px',
            height: '80px',
            borderRadius: '20px',
            background: 'rgba(251, 191, 36, 0.15)',
            backdropFilter: 'blur(10px)',
            transform: 'rotate(15deg)',
            animation: 'float 6s ease-in-out infinite'
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '25%',
            right: '15%',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            animation: 'float 8s ease-in-out infinite 2s'
          }}></div>

          {/* Content */}
          <div style={{
            position: 'relative',
            zIndex: 10,
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '100px 16px 80px',
            textAlign: 'center'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(251, 191, 36, 0.2)',
              backdropFilter: 'blur(10px)',
              padding: '10px 24px',
              borderRadius: '50px',
              marginBottom: '32px',
              border: '1px solid rgba(251, 191, 36, 0.3)',
              boxShadow: '0 8px 32px rgba(251, 191, 36, 0.2)'
            }}>
              <Sparkles style={{ height: '18px', width: '18px', color: '#fbbf24' }} />
              <span style={{ color: '#ffffff', fontWeight: '600', fontSize: '15px' }}>
                Your Trusted Student Housing Partner
              </span>
            </div>

            <h1 style={{
              fontSize: windowWidth < 768 ? '3.5rem' : windowWidth < 1024 ? '4.5rem' : '5.5rem',
              fontWeight: '900',
              marginBottom: '32px',
              lineHeight: '1.1',
              color: '#ffffff',
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
              letterSpacing: '-0.02em'
            }}>
              Find Your Perfect
              <span style={{ 
                display: 'block', 
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginTop: '12px',
                filter: 'drop-shadow(0 4px 8px rgba(251, 191, 36, 0.3))'
              }}>Student Home</span>
            </h1>
            <p style={{
              fontSize: windowWidth < 768 ? '1.25rem' : '1.5rem',
              marginBottom: '50px',
              color: '#e0e7ff',
              maxWidth: '800px',
              margin: '0 auto 50px',
              fontWeight: '500',
              lineHeight: '1.6',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
            }}>
              Verified student reviews • Safety ratings • Accurate distances • 24/7 HRA support
            </p>
            
            {/* Enhanced Search Bar */}
            <div style={{
              maxWidth: '800px',
              margin: '0 auto',
              background: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              padding: '16px',
              boxShadow: '0 30px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
              border: '2px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ display: 'flex', flexDirection: windowWidth < 640 ? 'column' : 'row', gap: '12px' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                  <MapPin style={{
                    position: 'absolute',
                    left: '20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#1e3a8a',
                    height: '22px',
                    width: '22px'
                  }} />
                  <input
                    placeholder="Enter university or location..."
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    style={{
                      paddingLeft: '56px',
                      paddingRight: '20px',
                      paddingTop: '18px',
                      paddingBottom: '18px',
                      border: '2px solid transparent',
                      color: '#111827',
                      fontSize: '17px',
                      fontWeight: '500',
                      width: '100%',
                      borderRadius: '14px',
                      outline: 'none',
                      backgroundColor: '#f9fafb',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#1e3a8a';
                      e.currentTarget.style.backgroundColor = '#ffffff';
                      e.currentTarget.style.boxShadow = '0 0 0 4px rgba(30, 58, 138, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'transparent';
                      e.currentTarget.style.backgroundColor = '#f9fafb';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>
                <button 
                  style={{
                    background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
                    padding: '18px 40px',
                    borderRadius: '14px',
                    color: '#ffffff',
                    fontWeight: '700',
                    fontSize: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 8px 20px rgba(30, 58, 138, 0.4)',
                    border: 'none',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onClick={handleSearch}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(30, 58, 138, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(30, 58, 138, 0.4)';
                  }}
                >
                  <Search style={{ height: '22px', width: '22px' }} />
                  Search
                </button>
              </div>
            </div>

            <div style={{ 
              marginTop: '32px', 
              color: '#dbeafe', 
              fontSize: '16px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              flexWrap: 'wrap'
            }}>
              <span>Popular:</span>
              {['Wits', 'UP', 'UCT', 'Stellenbosch'].map((uni, index) => (
                <span key={index} style={{ 
                  color: '#ffffff', 
                  fontWeight: '700',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  padding: '6px 16px',
                  borderRadius: '20px',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}>
                  {uni}
                </span>
              ))}
            </div>

            {/* Enhanced HRA Button */}
            <div style={{ marginTop: '50px' }}>
              <button 
                onClick={() => setIsHRAOpen(true)}
                style={{
                  position: 'relative',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                  color: '#ffffff',
                  padding: '20px 40px',
                  borderRadius: '50px',
                  fontWeight: '700',
                  fontSize: '17px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 12px 30px rgba(22, 163, 74, 0.4)',
                  border: 'none',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(22, 163, 74, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(22, 163, 74, 0.4)';
                }}
              >
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 100%)',
                  pointerEvents: 'none'
                }}></div>
                <Phone style={{ height: '22px', width: '22px' }} />
                Get 24/7 HRA Professional Support
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#86efac',
                  animation: 'pulse 2s ease-in-out infinite',
                  boxShadow: '0 0 0 0 rgba(134, 239, 172, 0.7)'
                }}></div>
              </button>
            </div>
          </div>

          {/* HRA Modal */}
          {isHRAOpen && (
            <div style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 50,
              padding: '16px',
              animation: 'fadeIn 0.3s ease'
            }}>
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                maxWidth: '480px',
                width: '100%',
                maxHeight: '90vh',
                overflow: 'hidden',
                boxShadow: '0 40px 80px rgba(0, 0, 0, 0.3)',
                animation: 'slideUp 0.3s ease',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '24px',
                  background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                  borderBottom: '2px solid #86efac'
                }}>
                  <h3 style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#166534',
                    margin: 0
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                      color: '#ffffff'
                    }}>
                      <Headphones style={{ height: '20px', width: '20px' }} />
                    </div>
                    24/7 HRA Support Chat
                  </h3>
                  <button 
                    onClick={() => setIsHRAOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(107, 114, 128, 0.1)',
                      color: '#6b7280',
                      transition: 'all 0.2s',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(220, 38, 38, 0.1)';
                      e.currentTarget.style.color = '#dc2626';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(107, 114, 128, 0.1)';
                      e.currentTarget.style.color = '#6b7280';
                    }}
                  >
                    <X style={{ height: '20px', width: '20px' }} />
                  </button>
                </div>
                
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                    padding: '20px',
                    borderRadius: '16px',
                    fontSize: '14px',
                    color: '#166534',
                    border: '2px solid #86efac',
                    boxShadow: '0 4px 12px rgba(22, 163, 74, 0.1)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', gap: '8px' }}>
                      <Clock style={{ height: '18px', width: '18px' }} />
                      <span style={{ fontWeight: '700', fontSize: '15px' }}>Available 24/7</span>
                    </div>
                    Professional Housing Rights Advocate ready to help with lease agreements, disputes, and tenant rights.
                  </div>
                  
                  <div style={{
                    height: '280px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '16px',
                    padding: '16px',
                    overflowY: 'auto',
                    background: 'linear-gradient(to bottom, #ffffff 0%, #f9fafb 100%)'
                  }}>
                    {hraChatMessages.map((msg, index) => (
                      <div key={index} style={{ 
                        marginBottom: '16px', 
                        textAlign: msg.sender === 'You' ? 'right' : 'left',
                        animation: 'slideIn 0.3s ease'
                      }}>
                        <div style={{
                          display: 'inline-block',
                          padding: '14px 18px',
                          borderRadius: '16px',
                          maxWidth: '320px',
                          background: msg.sender === 'You' 
                            ? 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)' 
                            : '#ffffff',
                          color: msg.sender === 'You' ? '#ffffff' : '#111827',
                          border: msg.sender === 'You' ? 'none' : '2px solid #e5e7eb',
                          boxShadow: msg.sender === 'You' 
                            ? '0 4px 12px rgba(30, 58, 138, 0.3)' 
                            : '0 2px 8px rgba(0, 0, 0, 0.05)',
                          textAlign: 'left'
                        }}>
                          <div style={{ fontSize: '14px', lineHeight: '1.5', fontWeight: '500' }}>{msg.message}</div>
                          <div style={{
                            fontSize: '12px',
                            marginTop: '6px',
                            color: msg.sender === 'You' ? '#bfdbfe' : '#9ca3af',
                            fontWeight: '600'
                          }}>
                            {msg.sender} • {msg.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                      placeholder="Ask about leases, deposits, rights..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      style={{
                        flex: 1,
                        border: '2px solid #e5e7eb',
                        borderRadius: '14px',
                        padding: '14px 18px',
                        outline: 'none',
                        fontSize: '14px',
                        fontWeight: '500',
                        backgroundColor: '#f9fafb',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#16a34a';
                        e.currentTarget.style.backgroundColor = '#ffffff';
                        e.currentTarget.style.boxShadow = '0 0 0 4px rgba(22, 163, 74, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#e5e7eb';
                        e.currentTarget.style.backgroundColor = '#f9fafb';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                    <button 
                      onClick={handleSendMessage}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                        color: '#ffffff',
                        padding: '14px',
                        borderRadius: '14px',
                        transition: 'all 0.3s ease',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)',
                        minWidth: '52px'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.boxShadow = '0 6px 16px rgba(22, 163, 74, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(22, 163, 74, 0.3)';
                      }}
                    >
                      <MessageCircle style={{ height: '20px', width: '20px' }} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* About Section */}
        <section style={{ 
          padding: '100px 16px', 
          background: 'linear-gradient(to bottom, #ffffff 0%, #f9fafb 50%, #ffffff 100%)',
          position: 'relative'
        }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '80px' }}>
              <div style={{
                display: 'inline-block',
                backgroundColor: 'rgba(30, 58, 138, 0.1)',
                padding: '8px 20px',
                borderRadius: '30px',
                marginBottom: '20px',
                border: '2px solid rgba(30, 58, 138, 0.2)'
              }}>
                <span style={{ color: '#1e3a8a', fontWeight: '700', fontSize: '14px' }}>ABOUT US</span>
              </div>
              <h2 style={{
                fontSize: windowWidth < 768 ? '2.5rem' : windowWidth < 1024 ? '3rem' : '3.5rem',
                fontWeight: '900',
                background: 'linear-gradient(135deg, #111827 0%, #1e3a8a 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '20px',
                letterSpacing: '-0.02em'
              }}>
                About RESCHECK
              </h2>
              <p style={{ fontSize: '20px', color: '#6b7280', fontWeight: '500', maxWidth: '600px', margin: '0 auto' }}>
                Connecting students with safe, verified accommodation
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: windowWidth < 1024 ? '1fr' : 'repeat(2, 1fr)',
              gap: '60px',
              alignItems: 'start'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                <div style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
                  borderRadius: '24px',
                  padding: '40px',
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
                  border: '2px solid rgba(30, 58, 138, 0.1)'
                }}>
                  <h3 style={{ fontSize: '32px', fontWeight: '800', color: '#111827', marginBottom: '20px' }}>
                    Our Mission
                  </h3>
                  <p style={{ color: '#4b5563', fontSize: '18px', lineHeight: '1.7', fontWeight: '500' }}>
                    RESCHECK was founded to solve the biggest challenge facing South African students: finding safe, 
                    affordable, and verified accommodation near their universities. We believe every student deserves 
                    a secure place to call home while pursuing their education.
                  </p>
                </div>
                
                <div>
                  <h3 style={{ fontSize: '32px', fontWeight: '800', color: '#111827', marginBottom: '28px' }}>
                    Why Choose RESCHECK?
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {[
                      { title: 'Verified Reviews Only:', desc: 'All reviews come from verified students using their university email addresses' },
                      { title: 'Safety First:', desc: 'Comprehensive safety ratings and security assessments for every property' },
                      { title: '24/7 HRA Support:', desc: 'Professional Housing Rights Advocates available around the clock' },
                      { title: 'Transparent Pricing:', desc: 'No hidden fees, clear pricing, and direct landlord contact' }
                    ].map((item, index) => (
                      <li key={index} style={{ 
                        display: 'flex', 
                        alignItems: 'flex-start',
                        backgroundColor: '#ffffff',
                        padding: '20px',
                        borderRadius: '16px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                        border: '2px solid #f3f4f6',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#1e3a8a';
                        e.currentTarget.style.transform = 'translateX(8px)';
                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(30, 58, 138, 0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#f3f4f6';
                        e.currentTarget.style.transform = 'translateX(0)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          minWidth: '32px',
                          height: '32px',
                          borderRadius: '10px',
                          background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                          marginRight: '16px',
                          marginTop: '2px'
                        }}>
                          <CheckCircle style={{ height: '20px', width: '20px', color: '#ffffff' }} />
                        </div>
                        <div>
                          <span style={{ fontWeight: '700', color: '#111827', fontSize: '16px' }}>{item.title}</span>
                          <span style={{ color: '#6b7280', fontSize: '15px', fontWeight: '500' }}> {item.desc}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                <div style={{
                  background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                  border: '3px solid #93c5fd',
                  borderRadius: '24px',
                  padding: '40px',
                  boxShadow: '0 10px 40px rgba(30, 58, 138, 0.15)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(30, 58, 138, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 40px rgba(30, 58, 138, 0.15)';
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '80px',
                      height: '80px',
                      borderRadius: '20px',
                      background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
                      marginBottom: '24px',
                      boxShadow: '0 8px 24px rgba(30, 58, 138, 0.3)'
                    }}>
                      <Users style={{ height: '40px', width: '40px', color: '#ffffff' }} />
                    </div>
                    <h4 style={{ fontSize: '28px', fontWeight: '800', color: '#111827', marginBottom: '16px' }}>
                      Trusted by Students
                    </h4>
                    <p style={{ color: '#1e40af', lineHeight: '1.7', fontSize: '16px', fontWeight: '600' }}>
                      Verified students across South African universities trust RESCHECK for their accommodation needs.
                    </p>
                  </div>
                </div>
                
                <div style={{
                  background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                  border: '3px solid #86efac',
                  borderRadius: '24px',
                  padding: '40px',
                  boxShadow: '0 10px 40px rgba(22, 163, 74, 0.15)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(22, 163, 74, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 40px rgba(22, 163, 74, 0.15)';
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '80px',
                      height: '80px',
                      borderRadius: '20px',
                      background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                      marginBottom: '24px',
                      boxShadow: '0 8px 24px rgba(22, 163, 74, 0.3)'
                    }}>
                      <Shield style={{ height: '40px', width: '40px', color: '#ffffff' }} />
                    </div>
                    <h4 style={{ fontSize: '28px', fontWeight: '800', color: '#111827', marginBottom: '16px' }}>
                      Safety Guaranteed
                    </h4>
                    <p style={{ color: '#15803d', lineHeight: '1.7', fontSize: '16px', fontWeight: '600' }}>
                      Every property undergoes our comprehensive safety verification process, ensuring you have access to secure accommodation options.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section style={{ 
          padding: '100px 16px', 
          background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f0f9ff 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Background Pattern */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(30, 58, 138, 0.05) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(22, 163, 74, 0.05) 0%, transparent 50%)
            `,
            pointerEvents: 'none'
          }}></div>

          <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
            <div style={{ textAlign: 'center', marginBottom: '80px' }}>
              <div style={{
                display: 'inline-block',
                backgroundColor: 'rgba(30, 58, 138, 0.1)',
                padding: '8px 20px',
                borderRadius: '30px',
                marginBottom: '20px',
                border: '2px solid rgba(30, 58, 138, 0.2)'
              }}>
                <span style={{ color: '#1e3a8a', fontWeight: '700', fontSize: '14px' }}>HOW IT WORKS</span>
              </div>
              <h2 style={{
                fontSize: windowWidth < 768 ? '2.5rem' : windowWidth < 1024 ? '3rem' : '3.5rem',
                fontWeight: '900',
                background: 'linear-gradient(135deg, #111827 0%, #1e3a8a 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '20px',
                letterSpacing: '-0.02em'
              }}>
                How RESCHECK Works
              </h2>
              <p style={{ fontSize: '20px', color: '#6b7280', fontWeight: '500', maxWidth: '600px', margin: '0 auto' }}>
                Simple, safe, and student-focused process
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
              {/* Step 1 */}
              <div style={{
                display: 'flex',
                flexDirection: windowWidth < 1024 ? 'column' : 'row',
                alignItems: 'center',
                gap: '60px'
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '24px',
                    border: '3px solid #e0f2fe',
                    padding: '40px',
                    transition: 'all 0.4s ease',
                    cursor: 'pointer',
                    boxShadow: '0 10px 40px rgba(30, 58, 138, 0.1)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 25px 60px rgba(30, 58, 138, 0.2)';
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.borderColor = '#1e3a8a';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 10px 40px rgba(30, 58, 138, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = '#e0f2fe';
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '20px',
                      right: '20px',
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(30, 58, 138, 0.05) 0%, transparent 70%)'
                    }}></div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '28px' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '60px',
                        height: '60px',
                        background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
                        color: '#ffffff',
                        borderRadius: '16px',
                        fontSize: '28px',
                        fontWeight: '900',
                        marginRight: '20px',
                        boxShadow: '0 8px 24px rgba(30, 58, 138, 0.3)'
                      }}>
                        1
                      </div>
                      <h3 style={{ fontSize: '28px', fontWeight: '800', color: '#111827', margin: 0 }}>
                        Search & Filter
                      </h3>
                    </div>
                    <p style={{
                      color: '#4b5563',
                      marginBottom: '28px',
                      fontSize: '17px',
                      lineHeight: '1.7',
                      fontWeight: '500'
                    }}>
                      Use our smart filters to find properties that match your budget, safety requirements, and distance preferences.
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {[
                        'Filter by budget categories (R1,000-R15,000+)',
                        'Set minimum safety ratings (1-5 stars)',
                        'Choose maximum distance from campus'
                      ].map((item, index) => (
                        <li key={index} style={{ display: 'flex', alignItems: 'flex-start', color: '#374151' }}>
                          <CheckCircle style={{ height: '22px', width: '22px', color: '#16a34a', marginRight: '14px', marginTop: '2px', flexShrink: 0 }} />
                          <span style={{ fontSize: '15px', fontWeight: '500' }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    aspectRatio: '16/9',
                    background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 50%, #93c5fd 100%)',
                    borderRadius: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 20px 60px rgba(30, 58, 138, 0.2)',
                    border: '3px solid #60a5fa',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.3) 0%, transparent 60%)'
                    }}></div>
                    <div style={{ textAlign: 'center', color: '#1e3a8a', position: 'relative', zIndex: 1 }}>
                      <Search style={{ height: '100px', width: '100px', margin: '0 auto 20px', strokeWidth: '1.5' }} />
                      <p style={{ fontSize: '22px', fontWeight: '800', margin: 0 }}>Step 1 Demo</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div style={{
                display: 'flex',
                flexDirection: windowWidth < 1024 ? 'column' : 'row-reverse',
                alignItems: 'center',
                gap: '60px'
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '24px',
                    border: '3px solid #e0f2fe',
                    padding: '40px',
                    transition: 'all 0.4s ease',
                    cursor: 'pointer',
                    boxShadow: '0 10px 40px rgba(30, 58, 138, 0.1)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 25px 60px rgba(30, 58, 138, 0.2)';
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.borderColor = '#1e3a8a';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 10px 40px rgba(30, 58, 138, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = '#e0f2fe';
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '20px',
                      left: '20px',
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(30, 58, 138, 0.05) 0%, transparent 70%)'
                    }}></div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '28px' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '60px',
                        height: '60px',
                        background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
                        color: '#ffffff',
                        borderRadius: '16px',
                        fontSize: '28px',
                        fontWeight: '900',
                        marginRight: '20px',
                        boxShadow: '0 8px 24px rgba(30, 58, 138, 0.3)'
                      }}>
                        2
                      </div>
                      <h3 style={{ fontSize: '28px', fontWeight: '800', color: '#111827', margin: 0 }}>
                        Read Verified Reviews
                      </h3>
                    </div>
                    <p style={{
                      color: '#4b5563',
                      marginBottom: '28px',
                      fontSize: '17px',
                      lineHeight: '1.7',
                      fontWeight: '500'
                    }}>
                      Get honest insights from verified students who have actually lived in these properties.
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {[
                        'Reviews from students verified with university emails',
                        'Safety and security ratings from real residents',
                        'Photos and videos uploaded by students'
                      ].map((item, index) => (
                        <li key={index} style={{ display: 'flex', alignItems: 'flex-start', color: '#374151' }}>
                          <CheckCircle style={{ height: '22px', width: '22px', color: '#16a34a', marginRight: '14px', marginTop: '2px', flexShrink: 0 }} />
                          <span style={{ fontSize: '15px', fontWeight: '500' }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    aspectRatio: '16/9',
                    background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 50%, #93c5fd 100%)',
                    borderRadius: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 20px 60px rgba(30, 58, 138, 0.2)',
                    border: '3px solid #60a5fa',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'radial-gradient(circle at 70% 50%, rgba(255, 255, 255, 0.3) 0%, transparent 60%)'
                    }}></div>
                    <div style={{ textAlign: 'center', color: '#1e3a8a', position: 'relative', zIndex: 1 }}>
                      <Shield style={{ height: '100px', width: '100px', margin: '0 auto 20px', strokeWidth: '1.5' }} />
                      <p style={{ fontSize: '22px', fontWeight: '800', margin: 0 }}>Step 2 Demo</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div style={{
                display: 'flex',
                flexDirection: windowWidth < 1024 ? 'column' : 'row',
                alignItems: 'center',
                gap: '60px'
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '24px',
                    border: '3px solid #e0f2fe',
                    padding: '40px',
                    transition: 'all 0.4s ease',
                    cursor: 'pointer',
                    boxShadow: '0 10px 40px rgba(30, 58, 138, 0.1)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 25px 60px rgba(30, 58, 138, 0.2)';
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.borderColor = '#1e3a8a';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 10px 40px rgba(30, 58, 138, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = '#e0f2fe';
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '20px',
                      right: '20px',
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(30, 58, 138, 0.05) 0%, transparent 70%)'
                    }}></div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '28px' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '60px',
                        height: '60px',
                        background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
                        color: '#ffffff',
                        borderRadius: '16px',
                        fontSize: '28px',
                        fontWeight: '900',
                        marginRight: '20px',
                        boxShadow: '0 8px 24px rgba(30, 58, 138, 0.3)'
                      }}>
                        3
                      </div>
                      <h3 style={{ fontSize: '28px', fontWeight: '800', color: '#111827', margin: 0 }}>
                        Contact & Get HRA Support
                      </h3>
                    </div>
                    <p style={{
                      color: '#4b5563',
                      marginBottom: '28px',
                      fontSize: '17px',
                      lineHeight: '1.7',
                      fontWeight: '500'
                    }}>
                      Connect with landlords directly and get professional support throughout your housing journey.
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {[
                        'Direct landlord contact details (phone & email)',
                        '24/7 Housing Rights Advocate support',
                        'Help with lease agreements and disputes'
                      ].map((item, index) => (
                        <li key={index} style={{ display: 'flex', alignItems: 'flex-start', color: '#374151' }}>
                          <CheckCircle style={{ height: '22px', width: '22px', color: '#16a34a', marginRight: '14px', marginTop: '2px', flexShrink: 0 }} />
                          <span style={{ fontSize: '15px', fontWeight: '500' }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    aspectRatio: '16/9',
                    background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 50%, #93c5fd 100%)',
                    borderRadius: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 20px 60px rgba(30, 58, 138, 0.2)',
                    border: '3px solid #60a5fa',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.3) 0%, transparent 60%)'
                    }}></div>
                    <div style={{ textAlign: 'center', color: '#1e3a8a', position: 'relative', zIndex: 1 }}>
                      <Phone style={{ height: '100px', width: '100px', margin: '0 auto 20px', strokeWidth: '1.5' }} />
                      <p style={{ fontSize: '22px', fontWeight: '800', margin: 0 }}>Step 3 Demo</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section style={{ 
          padding: '100px 16px', 
          background: 'linear-gradient(to bottom, #ffffff 0%, #f9fafb 100%)',
          position: 'relative'
        }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '80px' }}>
              <div style={{
                display: 'inline-block',
                backgroundColor: 'rgba(30, 58, 138, 0.1)',
                padding: '8px 20px',
                borderRadius: '30px',
                marginBottom: '20px',
                border: '2px solid rgba(30, 58, 138, 0.2)'
              }}>
                <span style={{ color: '#1e3a8a', fontWeight: '700', fontSize: '14px' }}>KEY FEATURES</span>
              </div>
              <h2 style={{
                fontSize: windowWidth < 768 ? '2.5rem' : windowWidth < 1024 ? '3rem' : '3.5rem',
                fontWeight: '900',
                background: 'linear-gradient(135deg, #111827 0%, #1e3a8a 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '20px',
                letterSpacing: '-0.02em'
              }}>
                Key Features
              </h2>
              <p style={{ fontSize: '20px', color: '#6b7280', fontWeight: '500', maxWidth: '700px', margin: '0 auto' }}>
                Everything you need to find safe, verified student accommodation
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: windowWidth < 768 ? '1fr' : windowWidth < 1024 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
              gap: '32px'
            }}>
              {keyFeatures.map((feature, index) => (
                <div key={index} style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '24px',
                  border: '2px solid #e5e7eb',
                  padding: '40px',
                  textAlign: 'center',
                  transition: 'all 0.4s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(30, 58, 138, 0.15)';
                  e.currentTarget.style.transform = 'translateY(-12px)';
                  e.currentTarget.style.borderColor = '#1e3a8a';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-50px',
                    right: '-50px',
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(30, 58, 138, 0.03) 0%, transparent 70%)',
                    pointerEvents: 'none'
                  }}></div>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                    borderRadius: '20px',
                    marginBottom: '28px',
                    boxShadow: '0 8px 24px rgba(30, 58, 138, 0.15)',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    zIndex: 1
                  }}>
                    <feature.icon style={{ height: '40px', width: '40px', color: '#1e3a8a', strokeWidth: '1.5' }} />
                  </div>
                  <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '16px', color: '#111827' }}>
                    {feature.title}
                  </h3>
                  <p style={{ color: '#6b7280', lineHeight: '1.7', fontSize: '15px', fontWeight: '500' }}>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Add CSS animations */}
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(15deg); }
            50% { transform: translateY(-20px) rotate(15deg); }
          }
          @keyframes pulse {
            0%, 100% { box-shadow: 0 0 0 0 rgba(134, 239, 172, 0.7); }
            50% { box-shadow: 0 0 0 10px rgba(134, 239, 172, 0); }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          @keyframes slideIn {
            from { transform: translateX(-20px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          @keyframes subtle-zoom {
            0% { transform: scale(1); }
            100% { transform: scale(1.05); }
          }
        `}</style>
      </div>
    </Layout>
  );
}