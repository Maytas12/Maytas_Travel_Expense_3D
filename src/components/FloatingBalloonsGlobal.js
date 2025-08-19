import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Global Floating Balloons Container
const GlobalBalloonsContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
`;

// Individual Balloon Component
const Balloon = styled(motion.div)`
  position: absolute;
  width: ${props => props.size || '60px'};
  height: ${props => props.size || '80px'};
  background: ${props => props.color || '#ff6b6b'};
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  opacity: ${props => props.opacity || 0.6};
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

// Floating particles
const Particle = styled(motion.div)`
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  pointer-events: none;
`;

const FloatingBalloonsGlobal = ({ count = 8, opacity = 0.6 }) => {
  const balloons = [
    { id: 1, color: '#ff6b6b', size: '80px', x: '10%', y: '20%', delay: 0 },
    { id: 2, color: '#4ecdc4', size: '60px', x: '80%', y: '30%', delay: 2 },
    { id: 3, color: '#45b7d1', size: '70px', x: '15%', y: '60%', delay: 4 },
    { id: 4, color: '#f9ca24', size: '50px', x: '70%', y: '70%', delay: 1 },
    { id: 5, color: '#6c5ce7', size: '65px', x: '50%', y: '15%', delay: 3 },
    { id: 6, color: '#fd79a8', size: '55px', x: '25%', y: '80%', delay: 5 },
    { id: 7, color: '#a8e6cf', size: '45px', x: '85%', y: '45%', delay: 6 },
    { id: 8, color: '#ffd3a5', size: '75px', x: '5%', y: '35%', delay: 7 },
  ];

  return (
    <GlobalBalloonsContainer>
      {balloons.slice(0, count).map((balloon) => (
        <Balloon
          key={balloon.id}
          color={balloon.color}
          size={balloon.size}
          opacity={opacity}
          initial={{ 
            y: 100, 
            opacity: 0
          }}
          animate={{ 
            y: [-20, -100, -20],
            opacity: [opacity * 0.7, opacity, opacity * 0.7],
            rotate: [0, 5, -5, 0],
            x: [0, 15, -15, 0]
          }}
          transition={{ 
            duration: 8 + balloon.delay,
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
      {[...Array(count * 3)].map((_, i) => (
        <Particle
          key={`particle-${i}`}
          initial={{ 
            opacity: 0,
            scale: 0
          }}
          animate={{ 
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
            y: [0, -150, -300],
            x: [0, Math.random() * 100 - 50, 0]
          }}
          transition={{ 
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeOut",
            delay: Math.random() * 8
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </GlobalBalloonsContainer>
  );
};

export default FloatingBalloonsGlobal;

