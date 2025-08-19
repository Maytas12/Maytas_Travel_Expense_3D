import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  padding: 3rem 0 1rem;
  position: relative;
  overflow: hidden;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
    gap: 1.5rem;
  }
`;

const FooterSection = styled(motion.div)`
  h3 {
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: #f59e0b;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 50px;
      height: 2px;
      background: linear-gradient(90deg, #f59e0b, #f59e0b);
      border-radius: 2px;
    }
  }

  p, li {
    margin-bottom: 0.8rem;
    opacity: 0.9;
    line-height: 1.6;
  }
`;

const LogoSection = styled(FooterSection)`
  h3 {
    font-size: 1.6rem;
    font-family: 'Orbitron', sans-serif;
    background: linear-gradient(135deg, #ff4757, #f59e0b);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  color: #ffffff;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: linear-gradient(135deg,#f59e0b, #42324eff);
    transform: translateY(-3px) scale(1.1);
    box-shadow: 0 5px 15px rgba(255, 71, 87, 0.4);
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  
  li {
    margin-bottom: 0.8rem;
    
    a {
      color: rgba(255, 255, 255, 0.8);
      text-decoration: none;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;

      &:hover {
        color: #f59e0b;
        transform: translateX(5px);
      }
    }
  }
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.9);

  svg {
    color: #f59e0b;
    font-size: 1.1rem;
    flex-shrink: 0;
  }
`;

const FooterBottom = styled(motion.div)`
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  margin-top: 1rem;
  padding-top: 1.5rem;
  text-align: center;
  opacity: 0.8;
  height:50px;
`;

const EnhancedFooter = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <LogoSection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3>Maytas Travel Expense</h3>
          <p>Streamlining travel and expense management for modern businesses. Our innovative platform helps organizations manage travel bookings, track expenses, and ensure compliance with ease.</p>
          <SocialLinks>
            <SocialLink 
              href="#" 
              aria-label="Facebook"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaFacebook />
            </SocialLink>
            <SocialLink 
              href="#" 
              aria-label="Twitter"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaTwitter />
            </SocialLink>
            <SocialLink 
              href="#" 
              aria-label="LinkedIn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaLinkedin />
            </SocialLink>
            <SocialLink 
              href="#" 
              aria-label="Instagram"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaInstagram />
            </SocialLink>
          </SocialLinks>
        </LogoSection>

        <FooterSection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h3>Quick Links</h3>
          <FooterLinks>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/gallery">Gallery</Link>
            </li>
            <li>
              <Link to="/careers">Careers</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </FooterLinks>
        </FooterSection>

        <FooterSection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
     
                   <h3>Contact Info</h3>
                   <ContactInfo>
                     <FaMapMarkerAlt />
                     <span> Noida, Uttar Pradesh, India</span>
                   </ContactInfo>
                   <ContactInfo>
                     <FaPhone />
                     <span>+91 1234567890</span>
                   </ContactInfo>
                   <ContactInfo>
                     <FaEnvelope />
                     <span>maytas.travel.expense.co.in</span>
                   </ContactInfo>
                 </FooterSection>

        <FooterSection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3>Business Hours</h3>
          <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
          <p>Saturday: 10:00 AM - 4:00 PM</p>
          <p>Sunday: Closed</p>
        </FooterSection>
      </FooterContent>

      <FooterBottom
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <p>&copy; {new Date().getFullYear()} Maytas Travel Expense. All rights reserved.</p>
      </FooterBottom>
    </FooterContainer>
  );
};

export default EnhancedFooter;
