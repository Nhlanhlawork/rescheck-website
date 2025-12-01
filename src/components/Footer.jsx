"use client";

import { 
  Home, 
  Building, 
  MessageCircle, 
  Shield, 
  Phone, 
  Mail, 
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
  Clock,
  Info
} from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const styles = {
    footer: {
      backgroundColor: "#1e3a8a",
      color: "#ffffff",
      padding: "64px 20px 40px",
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "48px",
      marginBottom: "48px",
    },
    brandSection: {
      marginBottom: "24px",
    },
    logoContainer: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      marginBottom: "16px",
    },
    logoImageContainer: {
      width: "48px",
      height: "48px",
      position: "relative",
    },
    logoImage: {
      objectFit: "contain",
    },
    logoText: {
      fontSize: "2rem",
      fontWeight: "bold",
      color: "#ffffff",
    },
    brandDescription: {
      fontSize: "0.95rem",
      color: "#bfdbfe",
      lineHeight: "1.6",
      marginBottom: "24px",
      maxWidth: "300px",
    },
    socialLinks: {
      display: "flex",
      gap: "16px",
    },
    socialIcon: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "all 0.3s ease",
      color: "#ffffff",
    },
    sectionTitle: {
      fontSize: "1.1rem",
      fontWeight: "600",
      color: "#ffffff",
      marginBottom: "24px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    linksList: {
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    linkItem: {
      marginBottom: "12px",
    },
    link: {
      color: "#bfdbfe",
      textDecoration: "none",
      fontSize: "0.95rem",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    contactInfo: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    },
    contactItem: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      color: "#bfdbfe",
      fontSize: "0.95rem",
    },
    contactIcon: {
      width: "24px",
      height: "24px",
      color: "#60a5fa",
    },
    infoSection: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    },
    infoItem: {
      color: "#bfdbfe",
      fontSize: "0.95rem",
      lineHeight: "1.5",
    },
    copyright: {
      textAlign: "center",
      paddingTop: "40px",
      borderTop: "1px solid rgba(255, 255, 255, 0.1)",
      color: "#bfdbfe",
      fontSize: "0.9rem",
    },
  };

  const handleSocialHover = (e) => {
    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
    e.currentTarget.style.transform = "translateY(-2px)";
  };

  const handleSocialLeave = (e) => {
    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
    e.currentTarget.style.transform = "translateY(0)";
  };

  const handleLinkHover = (e) => {
    e.currentTarget.style.color = "#ffffff";
    e.currentTarget.style.transform = "translateX(4px)";
  };

  const handleLinkLeave = (e) => {
    e.currentTarget.style.color = "#bfdbfe";
    e.currentTarget.style.transform = "translateX(0)";
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.grid}>
          {/* Brand Section with Image Logo */}
          <div>
            <div style={styles.brandSection}>
              <div style={styles.logoContainer}>
                <div style={styles.logoImageContainer}>
                  {/* Update the src to your logo image */}
                  <Image
                    src="/logo.png" // Change this to your logo path
                    alt="RESCHECK Logo"
                    fill
                    style={styles.logoImage}
                    sizes="48px"
                    priority
                  />
                </div>
                <div style={styles.logoText}>RESCHECK</div>
              </div>
              <p style={styles.brandDescription}>
                South Africa's most trusted student accommodation platform, connecting verified students with safe, affordable housing.
              </p>
            </div>
            <div style={styles.socialLinks}>
              <div 
                style={styles.socialIcon}
                onMouseEnter={handleSocialHover}
                onMouseLeave={handleSocialLeave}
              >
                <Facebook size={20} />
              </div>
              <div 
                style={styles.socialIcon}
                onMouseEnter={handleSocialHover}
                onMouseLeave={handleSocialLeave}
              >
                <Twitter size={20} />
              </div>
              <div 
                style={styles.socialIcon}
                onMouseEnter={handleSocialHover}
                onMouseLeave={handleSocialLeave}
              >
                <Instagram size={20} />
              </div>
              <div 
                style={styles.socialIcon}
                onMouseEnter={handleSocialHover}
                onMouseLeave={handleSocialLeave}
              >
                <Linkedin size={20} />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={styles.sectionTitle}>
              <Home size={20} />
              Quick Links
            </h3>
            <ul style={styles.linksList}>
              <li style={styles.linkItem}>
                <a 
                  href="/" 
                  style={styles.link}
                  onMouseEnter={handleLinkHover}
                  onMouseLeave={handleLinkLeave}
                >
                  <ArrowRight size={16} />
                  Home
                </a>
              </li>
              <li style={styles.linkItem}>
                <a 
                  href="/find-housing" 
                  style={styles.link}
                  onMouseEnter={handleLinkHover}
                  onMouseLeave={handleLinkLeave}
                >
                  <ArrowRight size={16} />
                  Find Housing
                </a>
              </li>
              <li style={styles.linkItem}>
                <a 
                  href="/list-housing" 
                  style={styles.link}
                  onMouseEnter={handleLinkHover}
                  onMouseLeave={handleLinkLeave}
                >
                  <ArrowRight size={16} />
                  List Your Property
                </a>
              </li>
              <li style={styles.linkItem}>
                <a 
                  href="/chat" 
                  style={styles.link}
                  onMouseEnter={handleLinkHover}
                  onMouseLeave={handleLinkLeave}
                >
                  <ArrowRight size={16} />
                  24/7 HRA Support
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 style={styles.sectionTitle}>
              <Phone size={20} />
              Contact Us
            </h3>
            <div style={styles.contactInfo}>
              <div style={styles.contactItem}>
                <Phone style={styles.contactIcon} />
                <span>+27 11 234 5678</span>
              </div>
              <div style={styles.contactItem}>
                <Mail style={styles.contactIcon} />
                <span>support@rescheck.co.za</span>
              </div>
              <div style={styles.contactItem}>
                <Clock style={styles.contactIcon} />
                <span>24/7 Support Available</span>
              </div>
              <div style={styles.contactItem}>
                <Globe style={styles.contactIcon} />
                <span>www.rescheck.co.za</span>
              </div>
            </div>
          </div>

          {/* Information Section (Replaces Our Impact) */}
          <div>
            <h3 style={styles.sectionTitle}>
              <Info size={20} />
              Information
            </h3>
            <div style={styles.infoSection}>
              <div style={styles.infoItem}>
                We partner with universities and private landlords to provide verified, safe student accommodation across South Africa.
              </div>
              <div style={styles.infoItem}>
                All properties undergo thorough verification and safety checks to ensure student security and comfort.
              </div>
              <div style={styles.infoItem}>
                HRA (Housing Resource Advisors) available 24/7 to assist with any accommodation needs or concerns.
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div style={styles.copyright}>
          <p>&copy; {new Date().getFullYear()} RESCHECK. All rights reserved.</p>
          <p style={{ marginTop: "8px", fontSize: "0.8rem" }}>
            Proudly serving South African students across 25+ universities
          </p>
        </div>
      </div>
    </footer>
  );
}