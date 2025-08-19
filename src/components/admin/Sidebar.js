import React from 'react';
import styled from 'styled-components';
import { FaHome, FaUsers, FaEnvelope, FaImage, FaCog } from 'react-icons/fa';

const SidebarContainer = styled.div`
  width: ${props => props.open ? '250px' : '70px'};
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  transition: width 0.3s ease;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  z-index: 1000;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  @media (max-width: 768px) {
    width: ${props => props.open ? '250px' : '0'};
    transform: ${props => props.open ? 'translateX(0)' : 'translateX(-100%)'};
  }
`;

const SidebarHeader = styled.div`
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Logo = styled.div`
  font-size: ${props => props.open ? '1.5rem' : '0.8rem'};
  font-weight: bold;
  transition: font-size 0.3s ease;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li`
  padding: 15px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: ${props => props.open ? '1rem' : '0.8rem'};

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &.active {
    background-color: rgba(255, 255, 255, 0.2);
    border-left: 3px solid #ffd700;
  }
`;

const MenuText = styled.span`
  display: ${props => props.open ? 'inline' : 'none'};
  transition: display 0.3s ease;
`;

const Sidebar = ({ activeSection, setActiveSection, sidebarOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <FaHome /> },
    { id: 'contact', label: 'Contact Data', icon: <FaEnvelope /> },
    { id: 'careers', label: 'Careers', icon: <FaUsers /> },
    { id: 'gallery', label: 'Gallery', icon: <FaImage /> },
    { id: 'settings', label: 'Settings', icon: <FaCog /> },
  ];

  return (
    <SidebarContainer open={sidebarOpen}>
      <SidebarHeader>
        <Logo open={sidebarOpen}>
          {sidebarOpen ? 'Admin Panel' : 'AP'}
        </Logo>
      </SidebarHeader>
      
      <MenuList>
        {menuItems.map(item => (
          <MenuItem 
            key={item.id}
            className={activeSection === item.id ? 'active' : ''}
            onClick={() => setActiveSection(item.id)}
            open={sidebarOpen}
          >
            {item.icon}
            <MenuText open={sidebarOpen}>{item.label}</MenuText>
          </MenuItem>
        ))}
      </MenuList>
    </SidebarContainer>
  );
};

export default Sidebar;
