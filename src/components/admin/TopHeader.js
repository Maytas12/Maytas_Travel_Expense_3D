import React from 'react';
import styled from 'styled-components';
import { FaBars, FaSignOutAlt } from 'react-icons/fa';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1001;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 5px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const Title = styled.h1`
  font-size: 1.2rem;
  margin: 0;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: color 0.3s ease;

  &:hover {
    color: #ffd700;
  }
`;

const TopHeader = ({ onLogout, toggleSidebar, sidebarOpen }) => {
  return (
    <HeaderContainer>
      <LeftSection>
        <ToggleButton onClick={toggleSidebar}>
          <FaBars />
        </ToggleButton>
        <Title>Admin Dashboard</Title>
      </LeftSection>
      
      <RightSection>
        <LogoutButton onClick={onLogout}>
          <FaSignOutAlt />
          Logout
        </LogoutButton>
      </RightSection>
    </HeaderContainer>
  );
};

export default TopHeader;
