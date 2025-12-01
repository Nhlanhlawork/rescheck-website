"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Home, 
  Building, 
  MessageCircle, 
  User, 
  UserPlus, 
  Menu, 
  X,
  Search,
  Phone,
  LogOut,
  Settings
} from "lucide-react";
import Image from "next/image";
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  
  // Use the auth context - fixed: using 'user' not 'currentUser'
  const { user, userData, logout, loading } = useAuth();

  useEffect(() => {
    // Set initial window width
    setWindowWidth(typeof window !== 'undefined' ? window.innerWidth : 0);
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsMenuOpen(false);
      window.location.href = "/";
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  // Get the correct dashboard link based on user type
  const getDashboardLink = () => {
    if (!userData) return "#";
    if (userData.userType === 'landlord') {
      return "/landlord-dashboard";
    } else if (userData.userType === 'student') {
      return "/student-dashboard";
    }
    return "/";
  };

  // Get user's first initial for avatar
  const getUserInitial = () => {
    if (!user?.email) return "U";
    return user.email.charAt(0).toUpperCase();
  };

  // Get user's display name or email username
  const getDisplayName = () => {
    if (userData?.name) return userData.name;
    if (user?.displayName) return user.displayName;
    if (user?.email) return user.email.split('@')[0];
    return "User";
  };

  // Get user type label
  const getUserTypeLabel = () => {
    if (!userData) return "Account";
    if (userData.userType === 'landlord') return "Landlord Dashboard";
    if (userData.userType === 'student') return "Student Dashboard";
    return "Dashboard";
  };

  const styles = {
    navbar: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.95)" : "#ffffff",
      backdropFilter: isScrolled ? "blur(10px)" : "none",
      boxShadow: isScrolled ? "0 4px 20px rgba(0, 0, 0, 0.08)" : "0 1px 0 rgba(0, 0, 0, 0.05)",
      padding: isScrolled ? "12px 0" : "16px 0",
      zIndex: 1000,
      transition: "all 0.3s ease",
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    logo: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      fontSize: isScrolled ? "1.5rem" : "1.75rem",
      fontWeight: "bold",
      color: "#1e3a8a",
      textDecoration: "none",
      transition: "all 0.3s ease",
    },
    logoContainer: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    logoImage: {
      objectFit: "contain",
      transition: "all 0.3s ease",
    },
    logoText: {
      color: "#1e3a8a",
      fontWeight: "bold",
      fontSize: isScrolled ? "1.5rem" : "1.75rem",
    },
    navLinks: {
      display: windowWidth > 768 ? "flex" : "none",
      alignItems: "center",
      gap: "32px",
    },
    navLink: {
      color: "#4b5563",
      textDecoration: "none",
      fontSize: "0.95rem",
      fontWeight: "500",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      gap: "6px",
      position: "relative",
    },
    navLinkActive: {
      color: "#1e3a8a",
      fontWeight: "600",
    },
    authButtons: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    signInButton: {
      padding: "10px 20px",
      backgroundColor: "transparent",
      color: "#1e3a8a",
      border: "1px solid #1e3a8a",
      borderRadius: "8px",
      fontSize: "0.9rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      gap: "6px",
    },
    signUpButton: {
      padding: "10px 20px",
      backgroundColor: "#1e3a8a",
      color: "#ffffff",
      border: "none",
      borderRadius: "8px",
      fontSize: "0.9rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      gap: "6px",
    },
    userProfile: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "8px 16px",
      backgroundColor: "#f8fafc",
      borderRadius: "8px",
      border: "1px solid #e2e8f0",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    userAvatar: {
      width: "32px",
      height: "32px",
      borderRadius: "50%",
      backgroundColor: "#1e3a8a",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold",
      fontSize: "14px",
    },
    userInfo: {
      display: "flex",
      flexDirection: "column",
    },
    userName: {
      fontWeight: "600",
      fontSize: "0.9rem",
      color: "#1e293b",
    },
    userEmail: {
      fontSize: "0.75rem",
      color: "#64748b",
    },
    logoutButton: {
      padding: "8px 16px",
      backgroundColor: "#fee2e2",
      color: "#dc2626",
      border: "none",
      borderRadius: "6px",
      fontSize: "0.85rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      gap: "6px",
    },
    hraBadge: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      backgroundColor: "#f0fdf4",
      padding: "8px 16px",
      borderRadius: "20px",
      fontSize: "0.85rem",
      fontWeight: "600",
      color: "#166534",
      border: "1px solid #d1fae5",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    hraBadgeLink: {
      textDecoration: "none",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    menuButton: {
      display: windowWidth <= 768 ? "flex" : "none",
      alignItems: "center",
      justifyContent: "center",
      width: "48px",
      height: "48px",
      backgroundColor: "#f9fafb",
      borderRadius: "12px",
      border: "none",
      cursor: "pointer",
      transition: "all 0.3s ease",
      color: "#1e3a8a",
    },
    mobileMenu: {
      position: "fixed",
      top: "80px",
      left: 0,
      right: 0,
      backgroundColor: "#ffffff",
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
      padding: "24px",
      display: windowWidth <= 768 && isMenuOpen ? "flex" : "none",
      flexDirection: "column",
      gap: "20px",
      zIndex: 999,
    },
    mobileNavLink: {
      color: "#4b5563",
      textDecoration: "none",
      fontSize: "1.1rem",
      fontWeight: "500",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "12px 0",
      borderBottom: "1px solid #f3f4f6",
    },
    mobileAuthButtons: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      marginTop: "20px",
    },
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: windowWidth <= 768 && isMenuOpen ? "block" : "none",
      zIndex: 998,
    },
    loadingText: {
      color: "#6b7280",
      fontSize: "0.9rem",
      fontStyle: "italic",
    }
  };

  const handleLogoHover = (e) => {
    e.currentTarget.style.transform = "scale(1.05)";
  };

  const handleLogoLeave = (e) => {
    e.currentTarget.style.transform = "scale(1)";
  };

  const handleNavLinkHover = (e) => {
    e.currentTarget.style.color = "#1e3a8a";
    e.currentTarget.style.transform = "translateY(-2px)";
  };

  const handleNavLinkLeave = (e) => {
    const path = window.location.pathname;
    const linkPath = e.currentTarget.getAttribute('href');
    if (path === linkPath) {
      e.currentTarget.style.color = "#1e3a8a";
    } else {
      e.currentTarget.style.color = "#4b5563";
    }
    e.currentTarget.style.transform = "translateY(0)";
  };

  const handleButtonHover = (e, isPrimary = false) => {
    if (isPrimary) {
      e.currentTarget.style.backgroundColor = "#1e40af";
      e.currentTarget.style.boxShadow = "0 8px 20px rgba(30, 58, 138, 0.3)";
    } else {
      e.currentTarget.style.backgroundColor = "#f9fafb";
      e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
    }
    e.currentTarget.style.transform = "translateY(-2px)";
  };

  const handleButtonLeave = (e, isPrimary = false) => {
    if (isPrimary) {
      e.currentTarget.style.backgroundColor = "#1e3a8a";
    } else {
      e.currentTarget.style.backgroundColor = "transparent";
    }
    e.currentTarget.style.boxShadow = "none";
    e.currentTarget.style.transform = "translateY(0)";
  };

  const handleUserProfileHover = (e) => {
    e.currentTarget.style.backgroundColor = "#e2e8f0";
    e.currentTarget.style.transform = "translateY(-2px)";
  };

  const handleUserProfileLeave = (e) => {
    e.currentTarget.style.backgroundColor = "#f8fafc";
    e.currentTarget.style.transform = "translateY(0)";
  };

  const handleLogoutButtonHover = (e) => {
    e.currentTarget.style.backgroundColor = "#fecaca";
    e.currentTarget.style.boxShadow = "0 4px 12px rgba(220, 38, 38, 0.2)";
    e.currentTarget.style.transform = "translateY(-2px)";
  };

  const handleLogoutButtonLeave = (e) => {
    e.currentTarget.style.backgroundColor = "#fee2e2";
    e.currentTarget.style.boxShadow = "none";
    e.currentTarget.style.transform = "translateY(0)";
  };

  const handleHraBadgeHover = (e) => {
    e.currentTarget.style.backgroundColor = "#d1fae5";
    e.currentTarget.style.transform = "translateY(-2px)";
    e.currentTarget.style.boxShadow = "0 4px 12px rgba(21, 128, 61, 0.2)";
  };

  const handleHraBadgeLeave = (e) => {
    e.currentTarget.style.backgroundColor = "#f0fdf4";
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "none";
  };

  const handleMenuButtonHover = (e) => {
    e.currentTarget.style.backgroundColor = "#e5e7eb";
    e.currentTarget.style.transform = "scale(1.05)";
  };

  const handleMenuButtonLeave = (e) => {
    e.currentTarget.style.backgroundColor = "#f9fafb";
    e.currentTarget.style.transform = "scale(1)";
  };

  const navItems = [
    { path: "/", label: "Home", icon: <Home size={18} /> },
    { path: "/find-housing", label: "Find Housing", icon: <Search size={18} /> },
    { path: "/list-housing", label: "List Housing", icon: <Building size={18} /> },
  ];

  if (loading) {
    return (
      <nav style={styles.navbar}>
        <div style={styles.container}>
          <div style={styles.logo}>
            <div style={styles.logoContainer}>
              <div style={{ 
                width: "48px", 
                height: "48px",
                position: "relative",
              }}>
                <Image
                  src="/logo.png"
                  alt="RESCHECK Logo"
                  fill
                  style={styles.logoImage}
                  sizes="(max-width: 768px) 48px, 48px"
                  priority
                />
              </div>
              <span style={styles.logoText}>RESCHECK</span>
            </div>
          </div>
          <span style={styles.loadingText}>Loading...</span>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav style={styles.navbar}>
        <div style={styles.container}>
          {/* Logo with Image */}
          <Link href="/" style={styles.logo} onMouseEnter={handleLogoHover} onMouseLeave={handleLogoLeave}>
            <div style={styles.logoContainer}>
              <div style={{ 
                width: isScrolled ? "40px" : "48px", 
                height: isScrolled ? "40px" : "48px",
                position: "relative",
                transition: "all 0.3s ease"
              }}>
                <Image
                  src="/logo.png"
                  alt="RESCHECK Logo"
                  fill
                  style={styles.logoImage}
                  sizes="(max-width: 768px) 48px, 48px"
                  priority
                />
              </div>
              <span style={styles.logoText}>RESCHECK</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div style={styles.navLinks}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                style={{
                  ...styles.navLink,
                  ...(window.location.pathname === item.path && styles.navLinkActive)
                }}
                onMouseEnter={handleNavLinkHover}
                onMouseLeave={handleNavLinkLeave}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
            
            {/* HRA Badge */}
            <Link 
              href="/chat" 
              style={styles.hraBadgeLink}
              onMouseEnter={handleHraBadgeHover}
              onMouseLeave={handleHraBadgeLeave}
            >
              <div style={styles.hraBadge}>
                <Phone size={14} />
                24/7 HRA Chat
              </div>
            </Link>
          </div>

          {/* Auth Buttons - Desktop */}
          <div style={{ ...styles.authButtons, display: windowWidth > 768 ? "flex" : "none" }}>
            {user ? (
              <>
                <Link href={getDashboardLink()} style={{ textDecoration: "none" }}>
                  <div 
                    style={styles.userProfile}
                    onMouseEnter={handleUserProfileHover}
                    onMouseLeave={handleUserProfileLeave}
                  >
                    <div style={styles.userAvatar}>
                      {getUserInitial()}
                    </div>
                    <div style={styles.userInfo}>
                      <span style={styles.userName}>{getDisplayName()}</span>
                      <span style={styles.userEmail}>{getUserTypeLabel()}</span>
                    </div>
                  </div>
                </Link>
                <button
                  style={styles.logoutButton}
                  onClick={handleLogout}
                  onMouseEnter={handleLogoutButtonHover}
                  onMouseLeave={handleLogoutButtonLeave}
                >
                  <LogOut size={14} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  style={styles.signInButton}
                  onMouseEnter={(e) => handleButtonHover(e, false)}
                  onMouseLeave={(e) => handleButtonLeave(e, false)}
                  onClick={() => window.location.href = "/signin"}
                >
                  <User size={16} />
                  Sign In
                </button>
                <button
                  style={styles.signUpButton}
                  onMouseEnter={(e) => handleButtonHover(e, true)}
                  onMouseLeave={(e) => handleButtonLeave(e, true)}
                  onClick={() => window.location.href = "/signup"}
                >
                  <UserPlus size={16} />
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            style={styles.menuButton}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            onMouseEnter={handleMenuButtonHover}
            onMouseLeave={handleMenuButtonLeave}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div style={styles.mobileMenu}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              style={styles.mobileNavLink}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
          
          {/* HRA Badge Mobile */}
          <Link 
            href="/chat" 
            style={styles.hraBadgeLink}
            onClick={() => setIsMenuOpen(false)}
          >
            <div style={{ ...styles.hraBadge, alignSelf: "flex-start", marginTop: "12px" }}>
              <Phone size={14} />
              24/7 HRA Chat
            </div>
          </Link>

          {/* Mobile Auth Buttons */}
          <div style={styles.mobileAuthButtons}>
            {user ? (
              <>
                <Link 
                  href={getDashboardLink()} 
                  style={{ textDecoration: "none" }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div style={{
                    ...styles.userProfile,
                    backgroundColor: "transparent",
                    border: "none",
                    padding: "12px 0",
                  }}>
                    <div style={styles.userAvatar}>
                      {getUserInitial()}
                    </div>
                    <div style={styles.userInfo}>
                      <span style={styles.userName}>{getDisplayName()}</span>
                      <span style={{...styles.userEmail, color: "#1e3a8a"}}>
                        {getUserTypeLabel()} →
                      </span>
                    </div>
                  </div>
                </Link>
                <button
                  style={styles.logoutButton}
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  style={styles.signInButton}
                  onClick={() => {
                    window.location.href = "/signin";
                    setIsMenuOpen(false);
                  }}
                >
                  <User size={16} />
                  Sign In
                </button>
                <button
                  style={styles.signUpButton}
                  onClick={() => {
                    window.location.href = "/signup";
                    setIsMenuOpen(false);
                  }}
                >
                  <UserPlus size={16} />
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Overlay */}
      <div style={styles.overlay} onClick={() => setIsMenuOpen(false)} />

      {/* Add space for fixed navbar */}
      <div style={{ height: isScrolled ? "80px" : "96px" }} />
    </>
  );
}