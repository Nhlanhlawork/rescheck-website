"use client";

import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { signUp } from "../../firebase/auth";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
  GraduationCap,
  Building,
  CheckCircle,
  X,
  Check
} from "lucide-react";

export default function SignUp() {
  const [userType, setUserType] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showUniversityDropdown, setShowUniversityDropdown] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    university: "",
    targetUniversities: [],
    password: "",
    confirmPassword: ""
  });

  const universities = [
    "University of Cape Town (UCT)",
    "University of the Witwatersrand (Wits)",
    "Stellenbosch University",
    "University of Pretoria (UP)",
    "University of KwaZulu-Natal (UKZN)",
    "Rhodes University",
    "University of the Free State (UFS)",
    "North-West University (NWU)",
    "University of the Western Cape (UWC)",
    "University of Limpopo (UL)",
    "University of Fort Hare",
    "University of Johannesburg (UJ)",
    "University of South Africa (UNISA)",
    "Nelson Mandela University",
    "University of Zululand (UNIZULU)",
    "University of Venda (UNIVEN)",
    "Walter Sisulu University (WSU)",
    "Cape Peninsula University of Technology (CPUT)",
    "Durban University of Technology (DUT)",
    "Tshwane University of Technology (TUT)",
    "Central University of Technology (CUT)",
    "Vaal University of Technology (VUT)",
    "Mangosuthu University of Technology (MUT)",
    "Sol Plaatje University",
    "University of Mpumalanga",
    "Sefako Makgatho Health Sciences University",
    "Boland TVET College",
    "Buffalo City TVET College",
    "Capricorn TVET College",
    "Central Johannesburg TVET College",
    "Coastal KZN TVET College",
    "College of Cape Town TVET",
    "Eastcape Midlands TVET College",
    "Ekurhuleni East TVET College",
    "Ekurhuleni West TVET College",
    "Elangeni TVET College",
    "Esayidi TVET College",
    "False Bay TVET College",
    "Flavius Mareka TVET College",
    "Goldfields TVET College",
    "Ikhala TVET College",
    "Ingwe TVET College",
    "King Hintsa TVET College",
    "King Sabata Dalindyebo TVET College",
    "Lephalale TVET College",
    "Letaba TVET College",
    "Lovedale TVET College",
    "Majuba TVET College",
    "Maluti TVET College",
    "Mnambithi TVET College",
    "Motheo TVET College",
    "Mthashana TVET College",
    "Nkangala TVET College",
    "Northern Cape Rural TVET College",
    "Northern Cape Urban TVET College",
    "Northlink TVET College",
    "Orbit TVET College",
    "Port Elizabeth TVET College",
    "Sedibeng TVET College",
    "Sekhukhune TVET College",
    "South Cape TVET College",
    "South West Gauteng TVET College",
    "Taletso TVET College",
    "Thekwini TVET College",
    "Tshwane North TVET College",
    "Tshwane South TVET College",
    "Umfolozi TVET College",
    "Umgungundlovu TVET College",
    "Vhembe TVET College",
    "Waterberg TVET College",
    "West Coast TVET College",
    "Western TVET College",
    "Westcol TVET College",
    "Boston City Campus",
    "Damelin",
    "CTU Training Solutions",
    "Rosebank College",
    "Varsity College",
    "Milpark Education",
    "The Independent Institute of Education (IIE)",
    "Regent Business School",
    "Stadio Higher Education",
    "IMM Graduate School of Marketing",
    "Other"
  ];

  useEffect(() => {
    setWindowWidth(typeof window !== 'undefined' ? window.innerWidth : 0);
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleUniversityToggle = (university) => {
    if (formData.targetUniversities.includes(university)) {
      setFormData({
        ...formData,
        targetUniversities: formData.targetUniversities.filter((u) => u !== university)
      });
    } else {
      setFormData({
        ...formData,
        targetUniversities: [...formData.targetUniversities, university]
      });
    }
  };

  const removeUniversity = (university) => {
    setFormData({
      ...formData,
      targetUniversities: formData.targetUniversities.filter((u) => u !== university)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Prepare user data
      const userData = {
        name: formData.name,
        userType: userType,
        university: userType === 'student' ? formData.university : null,
        targetUniversities: userType === 'landlord' ? formData.targetUniversities : []
      };

      // Sign up with Firebase
      const result = await signUp(formData.email, formData.password, userData);
      
      if (result.success) {
        alert('Account created successfully!');
        
        // Redirect based on user type
        if (userType === 'student') {
          window.location.href = '/student-dashboard';
        } else if (userType === 'landlord') {
          window.location.href = '/landlord-dashboard';
        }
      } else {
        setError(result.error);
        alert(`Error: ${result.error}`);
      }
    } catch (err) {
      console.error('Sign up error:', err);
      setError(err.message);
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#f9fafb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: windowWidth < 1024 ? '1fr' : '1fr 1fr',
          maxWidth: '1100px',
          width: '100%',
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.15)',
          minHeight: windowWidth < 1024 ? 'auto' : '700px'
        }}>
          {/* Left Side - Branding */}
          <div style={{
            background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #3730a3 100%)',
            padding: windowWidth < 1024 ? '60px 40px' : '80px 60px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Animated Background */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `
                radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)
              `,
              animation: 'pulse 6s ease-in-out infinite'
            }}></div>

            {/* Floating Elements */}
            <div style={{
              position: 'absolute',
              top: '10%',
              right: '10%',
              width: '100px',
              height: '100px',
              borderRadius: '30px',
              background: 'rgba(251, 191, 36, 0.1)',
              backdropFilter: 'blur(10px)',
              transform: 'rotate(20deg)',
              animation: 'float 8s ease-in-out infinite'
            }}></div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '20px',
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '32px',
                border: '2px solid rgba(255, 255, 255, 0.3)'
              }}>
                <Shield style={{ height: '40px', width: '40px', color: '#ffffff' }} />
              </div>

              <h1 style={{
                fontSize: windowWidth < 1024 ? '2.5rem' : '3rem',
                fontWeight: '900',
                color: '#ffffff',
                marginBottom: '20px',
                lineHeight: '1.1',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
              }}>
                Join RESCHECK Today
              </h1>

              <p style={{
                fontSize: '18px',
                color: '#e0e7ff',
                marginBottom: '40px',
                lineHeight: '1.6',
                fontWeight: '500'
              }}>
                Create your account and start {userType === 'student' ? 'finding your perfect student accommodation' : 'listing your properties to students'}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { icon: CheckCircle, text: 'Free to sign up' },
                  { icon: CheckCircle, text: 'Verified & secure platform' },
                  { icon: CheckCircle, text: 'Trusted by thousands' }
                ].map((item, i) => (
                  <div key={i} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px',
                    color: '#ffffff'
                  }}>
                    <item.icon style={{ height: '20px', width: '20px', color: '#fbbf24' }} />
                    <span style={{ fontSize: '15px', fontWeight: '500' }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div style={{ 
            padding: windowWidth < 1024 ? '40px 30px' : '80px 60px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            maxHeight: windowWidth < 1024 ? 'none' : '700px',
            overflowY: 'auto'
          }}>
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{
                fontSize: '28px',
                fontWeight: '800',
                color: '#111827',
                marginBottom: '8px'
              }}>
                Create Account
              </h2>
              <p style={{
                fontSize: '15px',
                color: '#6b7280'
              }}>
                Get started with your free account
              </p>
            </div>

            {/* User Type Switcher */}
            <div style={{
              display: 'flex',
              gap: '12px',
              marginBottom: '32px',
              backgroundColor: '#f3f4f6',
              padding: '6px',
              borderRadius: '12px'
            }}>
              <button
                type="button"
                style={{
                  flex: 1,
                  padding: '12px',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backgroundColor: userType === 'student' ? '#1e3a8a' : 'transparent',
                  color: userType === 'student' ? '#ffffff' : '#6b7280',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
                onClick={() => setUserType('student')}
              >
                <GraduationCap style={{ height: '16px', width: '16px' }} />
                Student
              </button>
              <button
                type="button"
                style={{
                  flex: 1,
                  padding: '12px',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backgroundColor: userType === 'landlord' ? '#1e3a8a' : 'transparent',
                  color: userType === 'landlord' ? '#ffffff' : '#6b7280',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
                onClick={() => setUserType('landlord')}
              >
                <Building style={{ height: '16px', width: '16px' }} />
                Landlord
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Full Name */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Full Name
                </label>
                <div style={{ position: 'relative' }}>
                  <User style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    height: '20px',
                    width: '20px',
                    color: '#9ca3af',
                    pointerEvents: 'none'
                  }} />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="John Doe"
                    required
                    disabled={loading}
                    style={{
                      width: '100%',
                      padding: '12px 16px 12px 48px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#1e3a8a';
                      e.target.style.boxShadow = '0 0 0 4px rgba(30, 58, 138, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>

              {/* Email */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    height: '20px',
                    width: '20px',
                    color: '#9ca3af',
                    pointerEvents: 'none'
                  }} />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="your.email@example.com"
                    required
                    disabled={loading}
                    style={{
                      width: '100%',
                      padding: '12px 16px 12px 48px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#1e3a8a';
                      e.target.style.boxShadow = '0 0 0 4px rgba(30, 58, 138, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>

              {/* University (For Students) */}
              {userType === 'student' && (
                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    University
                  </label>
                  <div style={{ position: 'relative' }}>
                    <GraduationCap style={{
                      position: 'absolute',
                      left: '16px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      height: '20px',
                      width: '20px',
                      color: '#9ca3af',
                      pointerEvents: 'none',
                      zIndex: 1
                    }} />
                    <select
                      value={formData.university}
                      onChange={(e) => setFormData({...formData, university: e.target.value})}
                      required
                      disabled={loading}
                      style={{
                        width: '100%',
                        padding: '12px 16px 12px 48px',
                        border: '2px solid #e5e7eb',
                        borderRadius: '10px',
                        fontSize: '15px',
                        outline: 'none',
                        cursor: 'pointer',
                        appearance: 'none',
                        backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%239ca3af\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 16px center',
                        backgroundSize: '20px',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#1e3a8a';
                        e.target.style.boxShadow = '0 0 0 4px rgba(30, 58, 138, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e5e7eb';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      <option value="">Select your university</option>
                      {universities.map(uni => (
                        <option key={uni} value={uni}>{uni}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Target Universities (For Landlords) */}
              {userType === 'landlord' && (
                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Target Universities
                  </label>
                  
                  {/* Selected Universities Chips */}
                  {formData.targetUniversities.length > 0 && (
                    <div style={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: '8px', 
                      marginBottom: '8px' 
                    }}>
                      {formData.targetUniversities.map(uni => (
                        <span key={uni} style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '6px 12px',
                          backgroundColor: '#dbeafe',
                          color: '#1e40af',
                          borderRadius: '20px',
                          fontSize: '13px',
                          fontWeight: '600',
                          border: '1px solid #93c5fd'
                        }}>
                          {uni.split(' ')[0]}
                          <button
                            type="button"
                            onClick={() => removeUniversity(uni)}
                            style={{
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              padding: 0
                            }}
                          >
                            <X style={{ height: '14px', width: '14px', color: '#1e40af' }} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Dropdown */}
                  <div style={{ position: 'relative' }}>
                    <GraduationCap style={{
                      position: 'absolute',
                      left: '16px',
                      top: '14px',
                      height: '20px',
                      width: '20px',
                      color: '#9ca3af',
                      pointerEvents: 'none',
                      zIndex: 1
                    }} />
                    <button
                      type="button"
                      onClick={() => setShowUniversityDropdown(!showUniversityDropdown)}
                      disabled={loading}
                      style={{
                        width: '100%',
                        padding: '12px 16px 12px 48px',
                        border: '2px solid #e5e7eb',
                        borderRadius: '10px',
                        fontSize: '15px',
                        outline: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                        backgroundColor: '#ffffff',
                        color: '#6b7280'
                      }}
                    >
                      Click to select universities
                    </button>
                    
                    {showUniversityDropdown && (
                      <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        marginTop: '4px',
                        backgroundColor: '#ffffff',
                        border: '2px solid #e5e7eb',
                        borderRadius: '10px',
                        maxHeight: '220px',
                        overflowY: 'auto',
                        zIndex: 10,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                      }}>
                        {universities.map(uni => (
                          <div
                            key={uni}
                            onClick={() => handleUniversityToggle(uni)}
                            style={{
                              padding: '12px 16px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              transition: 'background-color 0.2s',
                              backgroundColor: formData.targetUniversities.includes(uni) ? '#f3f4f6' : 'transparent'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = formData.targetUniversities.includes(uni) ? '#f3f4f6' : 'transparent';
                            }}
                          >
                            <span style={{ fontSize: '14px', color: '#111827' }}>{uni}</span>
                            {formData.targetUniversities.includes(uni) && (
                              <Check style={{ height: '16px', width: '16px', color: '#1e3a8a' }} />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Password */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    height: '20px',
                    width: '20px',
                    color: '#9ca3af',
                    pointerEvents: 'none'
                  }} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    placeholder="Minimum 8 characters"
                    required
                    minLength={8}
                    disabled={loading}
                    style={{
                      width: '100%',
                      padding: '12px 48px 12px 48px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#1e3a8a';
                      e.target.style.boxShadow = '0 0 0 4px rgba(30, 58, 138, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '16px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    {showPassword ? (
                      <EyeOff style={{ height: '20px', width: '20px', color: '#9ca3af' }} />
                    ) : (
                      <Eye style={{ height: '20px', width: '20px', color: '#9ca3af' }} />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Confirm Password
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    height: '20px',
                    width: '20px',
                    color: '#9ca3af',
                    pointerEvents: 'none'
                  }} />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    placeholder="Re-enter password"
                    required
                    disabled={loading}
                    style={{
                      width: '100%',
                      padding: '12px 48px 12px 48px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#1e3a8a';
                      e.target.style.boxShadow = '0 0 0 4px rgba(30, 58, 138, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{
                      position: 'absolute',
                      right: '16px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    {showConfirmPassword ? (
                      <EyeOff style={{ height: '20px', width: '20px', color: '#9ca3af' }} />
                    ) : (
                      <Eye style={{ height: '20px', width: '20px', color: '#9ca3af' }} />
                    )}
                  </button>
                </div>
                {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p style={{ fontSize: '13px', color: '#dc2626', marginTop: '6px' }}>
                    Passwords do not match
                  </p>
                )}
              </div>

              {/* Terms and Privacy */}
              <div style={{
                marginBottom: '24px',
                fontSize: '13px',
                color: '#6b7280',
                lineHeight: '1.6'
              }}>
                By creating an account, you agree to our{' '}
                <button
                  type="button"
                  onClick={() => setShowTerms(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#1e3a8a',
                    fontWeight: '600',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    padding: 0
                  }}
                >
                  Terms of Service
                </button>
                {' '}and{' '}
                <button
                  type="button"
                  onClick={() => setShowPrivacyPolicy(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#1e3a8a',
                    fontWeight: '600',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    padding: 0
                  }}
                >
                  Privacy Policy
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={formData.password !== formData.confirmPassword || loading}
                style={{
                  width: '100%',
                  padding: '14px',
                  background: (formData.password !== formData.confirmPassword || loading)
                    ? 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)'
                    : 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '15px',
                  fontWeight: '700',
                  cursor: (formData.password !== formData.confirmPassword || loading) ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 12px rgba(30, 58, 138, 0.3)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  opacity: (formData.password !== formData.confirmPassword || loading) ? 0.6 : 1
                }}
                onMouseEnter={(e) => {
                  if (formData.password === formData.confirmPassword && !loading) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(30, 58, 138, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (formData.password === formData.confirmPassword) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(30, 58, 138, 0.3)';
                  }
                }}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
                {!loading && <ArrowRight style={{ height: '20px', width: '20px' }} />}
              </button>
            </form>

            {/* Sign In Link */}
            <div style={{
              marginTop: '24px',
              textAlign: 'center',
              fontSize: '15px',
              color: '#6b7280'
            }}>
              Already have an account?{' '}
              <a href="/signin" style={{
                color: '#1e3a8a',
                fontWeight: '700',
                textDecoration: 'none',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = '#1e40af'}
              onMouseLeave={(e) => e.target.style.color = '#1e3a8a'}>
                Sign In
              </a>
            </div>
          </div>
        </div>

        {/* Privacy Policy Modal */}
        {showPrivacyPolicy && (
          <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px',
            overflowY: 'auto'
          }} onClick={() => setShowPrivacyPolicy(false)}>
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              maxWidth: '700px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '40px',
              position: 'relative',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
              margin: '20px'
            }} onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setShowPrivacyPolicy(false)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: '#f3f4f6',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '50%',
                  transition: 'background-color 0.3s',
                  zIndex: 10
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
              >
                <X style={{ height: '20px', width: '20px', color: '#6b7280' }} />
              </button>

              <h2 style={{
                fontSize: '28px',
                fontWeight: '800',
                color: '#111827',
                marginBottom: '24px',
                paddingRight: '40px'
              }}>
                Privacy Policy
              </h2>

              <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>
                Last updated: December 2, 2025
              </p>

              <div style={{ fontSize: '14px', color: '#374151', lineHeight: '1.8' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', marginTop: '20px', marginBottom: '12px' }}>
                  1. Information We Collect
                </h3>
                <p style={{ marginBottom: '12px' }}>
                  We collect information you provide directly to us, including name, email address, university affiliation, housing preferences, and property listings.
                </p>

                <h3 style={{ fontSize: '18px', fontWeight: '700', marginTop: '20px', marginBottom: '12px' }}>
                  2. How We Use Your Information
                </h3>
                <p style={{ marginBottom: '12px' }}>
                  We use the information we collect to provide, maintain, and improve our services, to connect students with landlords, and to send you technical notices and support messages.
                </p>

                <h3 style={{ fontSize: '18px', fontWeight: '700', marginTop: '20px', marginBottom: '12px' }}>
                  3. Information Sharing
                </h3>
                <p style={{ marginBottom: '12px' }}>
                  We do not sell your personal information. We may share your information with landlords when you apply for properties, and with service providers who assist in operating our platform.
                </p>

                <h3 style={{ fontSize: '18px', fontWeight: '700', marginTop: '20px', marginBottom: '12px' }}>
                  4. Data Security
                </h3>
                <p style={{ marginBottom: '12px' }}>
                  We implement appropriate security measures to protect your personal information against unauthorized access and disclosure.
                </p>

                <h3 style={{ fontSize: '18px', fontWeight: '700', marginTop: '20px', marginBottom: '12px' }}>
                  5. Your Rights
                </h3>
                <p style={{ marginBottom: '12px' }}>
                  You have the right to access, correct, or delete your personal information at any time through your account settings.
                </p>

                <h3 style={{ fontSize: '18px', fontWeight: '700', marginTop: '20px', marginBottom: '12px' }}>
                  6. Contact Us
                </h3>
                <p style={{ marginBottom: '12px' }}>
                  If you have questions about this Privacy Policy, please contact us at privacy@rescheck.co.za
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Terms & Conditions Modal */}
        {showTerms && (
          <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px',
            overflowY: 'auto'
          }} onClick={() => setShowTerms(false)}>
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              maxWidth: '700px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '40px',
              position: 'relative',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
              margin: '20px'
            }} onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setShowTerms(false)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: '#f3f4f6',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '50%',
                  transition: 'background-color 0.3s',
                  zIndex: 10
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
              >
                <X style={{ height: '20px', width: '20px', color: '#6b7280' }} />
              </button>

              <h2 style={{
                fontSize: '28px',
                fontWeight: '800',
                color: '#111827',
                marginBottom: '24px',
                paddingRight: '40px'
              }}>
                Terms of Service
              </h2>

              <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>
                Last updated: December 2, 2025
              </p>

              <div style={{ fontSize: '14px', color: '#374151', lineHeight: '1.8' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', marginTop: '20px', marginBottom: '12px' }}>
                  1. Acceptance of Terms
                </h3>
                <p style={{ marginBottom: '12px' }}>
                  By accessing and using RESCHECK, you accept and agree to be bound by these Terms of Service.
                </p>

                <h3 style={{ fontSize: '18px', fontWeight: '700', marginTop: '20px', marginBottom: '12px' }}>
                  2. User Accounts
                </h3>
                <p style={{ marginBottom: '12px' }}>
                  You are responsible for maintaining the confidentiality of your account and password. You agree to provide accurate information and update it as necessary.
                </p>

                <h3 style={{ fontSize: '18px', fontWeight: '700', marginTop: '20px', marginBottom: '12px' }}>
                  3. Property Listings
                </h3>
                <p style={{ marginBottom: '12px' }}>
                  Landlords must provide accurate and truthful information about their properties. Misleading or fraudulent listings will result in account termination.
                </p>

                <h3 style={{ fontSize: '18px', fontWeight: '700', marginTop: '20px', marginBottom: '12px' }}>
                  4. User Conduct
                </h3>
                <p style={{ marginBottom: '12px' }}>
                  Users agree to use the platform lawfully and respectfully. Harassment, discrimination, or fraudulent activities are strictly prohibited.
                </p>

                <h3 style={{ fontSize: '18px', fontWeight: '700', marginTop: '20px', marginBottom: '12px' }}>
                  5. Limitation of Liability
                </h3>
                <p style={{ marginBottom: '12px' }}>
                  RESCHECK is a platform connecting students and landlords. We are not responsible for the quality, safety, or legality of properties listed or the actions of users.
                </p>

                <h3 style={{ fontSize: '18px', fontWeight: '700', marginTop: '20px', marginBottom: '12px' }}>
                  6. Termination
                </h3>
                <p style={{ marginBottom: '12px' }}>
                  We reserve the right to suspend or terminate accounts that violate these terms without prior notice.
                </p>

                <h3 style={{ fontSize: '18px', fontWeight: '700', marginTop: '20px', marginBottom: '12px' }}>
                  7. Governing Law
                </h3>
                <p style={{ marginBottom: '12px' }}>
                  These terms are governed by the laws of the Republic of South Africa.
                </p>

                <h3 style={{ fontSize: '18px', fontWeight: '700', marginTop: '20px', marginBottom: '12px' }}>
                  8. Contact Us
                </h3>
                <p style={{ marginBottom: '12px' }}>
                  For questions about these terms, contact us at support@rescheck.co.za
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Animations */}
        <style jsx>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
          }

          @keyframes float {
            0%, 100% { 
              transform: translateY(0px) rotate(20deg); 
            }
            50% { 
              transform: translateY(-20px) rotate(25deg); 
            }
          }
        `}</style>
      </div>
    </Layout>
  );
}