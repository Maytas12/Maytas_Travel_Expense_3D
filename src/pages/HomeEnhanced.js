import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaPlane, 
  FaCreditCard, 
  FaChartLine, 
  FaShieldAlt, 
  FaUsers, 
  FaGlobe,
  FaQuoteLeft,
  FaStar,
  FaCheckCircle,
  FaArrowRight,
  FaPlay,
  FaLinkedin,
  FaTwitter,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';

// Enhanced Hero Section with Balloon Effects
const HeroSection = styled.section`
  height: 100vh;
  background: linear-gradient(135deg, 
    #ff9a9e 0%, 
    #fecfef 25%, 
    #fecfef 50%, 
    #a8edea 75%, 
    #fed6e3 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 80%, rgba(255, 154, 158, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(168, 237, 234, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(254, 207, 239, 0.3) 0%, transparent 50%);
    animation: float 20s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }
`;

// Floating Balloons Container
const BalloonsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
`;

// Individual Balloon Component
const Balloon = styled(motion.div)`
  position: absolute;
  width: ${props => props.size || '60px'};
  height: ${props => props.size || '80px'};
  background: ${props => props.color || '#ff6b6b'};
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  opacity: 0.8;
  box-shadow: 
    inset -10px -10px 20px rgba(0, 0, 0, 0.1),
    0 5px 15px rgba(0, 0, 0, 0.2);
  
  &::before {
    content: '';
    position: absolute;
    top: 10%;
    left: 20%;
    width: 30%;
    height: 30%;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    filter: blur(5px);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 30px;
    background: rgba(0, 0, 0, 0.2);
  }
`;

// Enhanced Hero Content
const HeroContent = styled.div`
  position: relative;
  z-index: 3;
  max-width: 900px;
  padding: 0 2rem;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 4.5rem;
  margin-bottom: 1.5rem;
  font-weight: 800;
  line-height: 1.1;
  background: linear-gradient(135deg, #ffffff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 3rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.8rem;
  margin-bottom: 2.5rem;
  opacity: 0.95;
  line-height: 1.6;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.4rem;
  }
`;

const CTAButton = styled(motion(Link))`
  display: inline-block;
  padding: 1.4rem 3rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border-radius: 50px;
  font-size: 1.3rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.4s ease;
  box-shadow: 
    0 8px 25px rgba(102, 126, 234, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 
      0 15px 35px rgba(102, 126, 234, 0.6),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
    
    &::before {
      left: 100%;
    }
  }
`;

// Floating particles
const Particle = styled(motion.div)`
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  pointer-events: none;
`;

// Balloon Component
const FloatingBalloons = () => {
  const balloons = [
    { id: 1, color: '#ff6b6b', size: '80px', x: '10%', y: '20%', delay: 0 },
    { id: 2, color: '#4ecdc4', size: '60px', x: '80%', y: '30%', delay: 2 },
    { id: 3, color: '#45b7d1', size: '70px', x: '15%', y: '60%', delay: 4 },
    { id: 4, color: '#f9ca24', size: '50px', x: '70%', y: '70%', delay: 1 },
    { id: 5, color: '#6c5ce7', size: '65px', x: '50%', y: '15%', delay: 3 },
    { id: 6, color: '#fd79a8', size: '55px', x: '25%', y: '80%', delay: 5 },
  ];

  return (
    <BalloonsContainer>
      {balloons.map((balloon) => (
        <Balloon
          key={balloon.id}
          color={balloon.color}
          size={balloon.size}
          initial={{ 
            y: 100, 
            opacity: 0
          }}
          animate={{ 
            y: [-20, -80, -20],
            opacity: [0.7, 0.9, 0.7],
            rotate: [0, 5, -5, 0],
            x: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 6 + balloon.delay,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: balloon.delay
          }}
          style={{
            left: balloon.x,
            top: balloon.y,
          }}
        />
      ))}
      
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <Particle
          key={`particle-${i}`}
          initial={{ 
            opacity: 0,
            scale: 0
          }}
          animate={{ 
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
            y: [0, -100, -200],
            x: [0, Math.random() * 100 - 50, 0]
          }}
          transition={{ 
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeOut",
            delay: Math.random() * 5
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </BalloonsContainer>
  );
};

const HomeEnhanced = () => {
  return (
    <>
      <HeroSection>
        <FloatingBalloons />
        <HeroContent>
          <HeroTitle
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Simplify Your Travel & Expense Management
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Streamline business travel, automate expense reporting, and gain complete control over your travel spend with Maytas.
          </HeroSubtitle>
          <CTAButton
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            to="/contact"
          >
            Get Started Today
          </CTAButton>
        </HeroContent>
      </HeroSection>
    </>
  );
};

export default HomeEnhanced;
