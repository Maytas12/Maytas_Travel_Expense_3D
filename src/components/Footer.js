import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.white};
  padding: 3rem 0 1rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 1rem;
  }
`;

const FooterSection = styled.div`
  h3 {
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.accent};
  }

  p, li {
    margin-bottom: 0.5rem;
    opacity: 0.9;
  }
`;

const FooterLinks = styled.ul`
  li {
    margin-bottom: 0.5rem;
    
    a {
      transition: color 0.3s ease;
      
      &:hover {
        color: ${({ theme }) => theme.colors.accent};
      }
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled(motion.a)`
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.5rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  margin-top: 2rem;
  padding-top: 1rem;
  text-align: center;
  opacity: 0.8;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>Maytas Travel Expense</h3>
          <p>Streamlining travel and expense management for modern businesses. Our innovative platform helps organizations manage travel bookings, track expenses, and ensure compliance with ease.</p>
          <SocialLinks>
            <SocialLink whileHover={{ scale: 1.1 }} href="#" aria-label="Facebook">
              <FaFacebook />
            </SocialLink>
            <SocialLink whileHover={{ scale: 1.1 }} href="#" aria-label="Twitter">
              <FaTwitter />
            </SocialLink>
            <SocialLink whileHover={{ scale: 1.1 }} href="#" aria-label="LinkedIn">
              <FaLinkedin />
            </SocialLink>
            <SocialLink whileHover={{ scale: 1.1 }} href="#" aria-label="Instagram">
              <FaInstagram />
            </SocialLink>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <h3>Quick Links</h3>
          <FooterLinks>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/careers">Careers</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </FooterLinks>
        </FooterSection>

        <FooterSection>
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

        <FooterSection>
          <h3>Business Hours</h3>
          <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
          <p>Saturday: 10:00 AM - 4:00 PM</p>
          <p>Sunday: Closed</p>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <p>&copy; 2024 Maytas Travel Expense. All rights reserved.</p>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
