"use client";

import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { signIn, resetPassword } from "../../firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
  GraduationCap,
  Building,
  CheckCircle,
  X
} from "lucide-react";

export default function SignIn() {
  const [userType, setUserType] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [resetEmail, setResetEmail] = useState("");

  useEffect(() => {
    setWindowWidth(typeof window !== 'undefined' ? window.innerWidth : 0);
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Sign in with Firebase
      const result = await signIn(formData.email, formData.password);
      
      if (result.success) {
        // Get user data to check user type
        const userDoc = await getDoc(doc(db, 'users', result.user.uid));
        const userData = userDoc.data();
        
        // Redirect based on user type
        if (userData.userType === 'student') {
          window.location.href = '/student-dashboard';
        } else if (userData.userType === 'landlord') {
          window.location.href = '/landlord-dashboard';
        }
      } else {
        setError(result.error);
        alert(`Error: ${result.error}`);
      }
    } catch (err) {
      console.error('Sign in error:', err);
      setError(err.message);
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    
    if (!resetEmail) {
      alert('Please enter your email address');
      return;
    }

    try {
      const result = await resetPassword(resetEmail);
      
      if (result.success) {
        alert(`Password reset link sent to ${resetEmail}`);
        setShowForgotPassword(false);
        setResetEmail("");
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
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
          minHeight: windowWidth < 1024 ? 'auto' : '650px'
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
                Welcome Back to RESCHECK
              </h1>

              <p style={{
                fontSize: '18px',
                color: '#e0e7ff',
                marginBottom: '40px',
                lineHeight: '1.6',
                fontWeight: '500'
              }}>
                Sign in to access your dashboard and manage your {userType === 'student' ? 'housing search' : 'properties'}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { icon: CheckCircle, text: 'Secure & verified platform' },
                  { icon: CheckCircle, text: '24/7 HRA support available' },
                  { icon: CheckCircle, text: 'Trusted by students & landlords' }
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
            justifyContent: 'center'
          }}>
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{
                fontSize: '28px',
                fontWeight: '800',
                color: '#111827',
                marginBottom: '8px'
              }}>
                Sign In
              </h2>
              <p style={{
                fontSize: '15px',
                color: '#6b7280'
              }}>
                Enter your credentials to continue
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
                      padding: '13px 16px 13px 48px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'all 0.3s ease',
                      backgroundColor: '#ffffff'
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
                    placeholder="Enter your password"
                    required
                    disabled={loading}
                    style={{
                      width: '100%',
                      padding: '13px 48px 13px 48px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'all 0.3s ease',
                      backgroundColor: '#ffffff'
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
                      alignItems: 'center',
                      justifyContent: 'center'
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

              {/* Forgot Password */}
              <div style={{ 
                textAlign: 'right', 
                marginBottom: '28px'
              }}>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '14px',
                    color: '#1e3a8a',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#1e40af'}
                  onMouseLeave={(e) => e.target.style.color = '#1e3a8a'}
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '15px',
                  background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '700',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 12px rgba(30, 58, 138, 0.3)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  opacity: loading ? 0.7 : 1
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(30, 58, 138, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(30, 58, 138, 0.3)';
                }}
              >
                {loading ? 'Signing In...' : 'Sign In'}
                {!loading && <ArrowRight style={{ height: '20px', width: '20px' }} />}
              </button>
            </form>

            {/* Sign Up Link */}
            <div style={{
              marginTop: '28px',
              textAlign: 'center',
              fontSize: '15px',
              color: '#6b7280'
            }}>
              Don't have an account?{' '}
              <a href="/signup" style={{
                color: '#1e3a8a',
                fontWeight: '700',
                textDecoration: 'none',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = '#1e40af'}
              onMouseLeave={(e) => e.target.style.color = '#1e3a8a'}>
                Sign Up
              </a>
            </div>
          </div>
        </div>

        {/* Forgot Password Modal */}
        {showForgotPassword && (
          <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px'
          }} onClick={() => setShowForgotPassword(false)}>
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              maxWidth: '480px',
              width: '100%',
              padding: '0',
              position: 'relative',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)'
            }} onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setShowForgotPassword(false)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: '#f3f4f6',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '10px',
                  borderRadius: '50%',
                  transition: 'all 0.3s ease',
                  zIndex: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
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

              <div style={{ padding: '50px 40px 40px' }}>
                <div style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                  boxShadow: '0 8px 20px rgba(30, 58, 138, 0.3)'
                }}>
                  <Lock style={{ height: '32px', width: '32px', color: '#ffffff' }} />
                </div>

                <h3 style={{
                  fontSize: '26px',
                  fontWeight: '800',
                  color: '#111827',
                  textAlign: 'center',
                  marginBottom: '12px'
                }}>
                  Reset Password
                </h3>

                <p style={{
                  fontSize: '15px',
                  color: '#6b7280',
                  textAlign: 'center',
                  marginBottom: '32px',
                  lineHeight: '1.6'
                }}>
                  Enter your email address and we'll send you a link to reset your password
                </p>

                <form onSubmit={handlePasswordReset}>
                  <div style={{ marginBottom: '24px' }}>
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
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        placeholder="your.email@example.com"
                        required
                        autoFocus
                        style={{
                          width: '100%',
                          padding: '14px 16px 14px 48px',
                          border: '2px solid #e5e7eb',
                          borderRadius: '12px',
                          fontSize: '15px',
                          outline: 'none',
                          transition: 'all 0.3s ease',
                          backgroundColor: '#ffffff'
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

                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      padding: '16px',
                      background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '16px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 12px rgba(30, 58, 138, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(30, 58, 138, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(30, 58, 138, 0.3)';
                    }}
                  >
                    Send Reset Link
                  </button>
                </form>
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