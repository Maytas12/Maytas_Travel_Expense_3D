import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaBars, FaTimes, FaSearch, FaUserCircle, FaBell, FaUserLock } from 'react-icons/fa';

const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  font-size: 1.6rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  gap: 2rem;
  align-items: center;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    position: fixed;
    top: 70px;
    right: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
    height: calc(100vh - 70px);
    width: 70%;
    background: rgba(102, 126, 234, 0.98);
    flex-direction: column;
    align-items: center;
    padding-top: 2rem;
    transition: right 0.3s ease;
    backdrop-filter: blur(10px);
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1rem;
  transition: all 0.3s ease;
  position: relative;
  padding: 0.5rem 0;

  &:hover {
    color: #ffd700;
  }

  &.active {
    color: #ffd700;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 100%;
      height: 2px;
      background: #ffd700;
    }
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    padding: 1rem 0;
  }
`;

const AdminLoginButton = styled(Link)`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    color: #ffd700;
    transform: translateY(-2px);
  }
`;

const MenuToggle = styled.div`
  display: none;
  cursor: pointer;
  font-size: 1.5rem;
  z-index: 1001;

  @media (max-width: 768px) {
    display: block;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  padding: 0.4rem 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const SearchInput = styled.input`
  background: transparent;
  border: none;
  color: white;
  outline: none;
  width: 150px;
  font-size: 0.9rem;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const UserActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ActionButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #ffd700;
    transform: scale(1.1);
  }
`;

const EnhancedHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <HeaderContainer 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Nav>
        <Logo to="/">Maytas Travel</Logo>
        
        <NavLinks isOpen={isOpen}>
          <li><NavLink to="/" className={location.pathname === '/' ? 'active' : ''} onClick={closeMenu}>Home</NavLink></li>
          <li><NavLink to="/about" className={location.pathname === '/about' ? 'active' : ''} onClick={closeMenu}>About</NavLink></li>
          <li><NavLink to="/gallery" className={location.pathname === '/gallery' ? 'active' : ''} onClick={closeMenu}>Gallery</NavLink></li>
          <li><NavLink to="/careers" className={location.pathname === '/careers' ? 'active' : ''} onClick={closeMenu}>Careers</NavLink></li>
          <li><NavLink to="/contact" className={location.pathname === '/contact' ? 'active' : ''} onClick={closeMenu}>Contact</NavLink></li>
          {/* <li><AdminLoginButton to="/admin/login" onClick={closeMenu}>
            <FaUserLock /> Admin Login
          </AdminLoginButton></li> */}
        </NavLinks>

        <UserActions>
          {/* <SearchContainer>
            <FaSearch />
            <SearchInput type="text" placeholder="Search..." />
          </SearchContainer>
          
          <ActionButton>
            <FaBell />
          </ActionButton>
          
          <ActionButton>
            <FaUserCircle />
          </ActionButton>
           */}
          <AdminLoginButton to="/admin/login">
            <FaUserLock /> Admin Login
          </AdminLoginButton>
        </UserActions>

        <MenuToggle onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </MenuToggle>
      </Nav>
    </HeaderContainer>
  );
};

export default EnhancedHeader;
