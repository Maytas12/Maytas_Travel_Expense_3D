import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from '../components/admin/Sidebar';
import TopHeader from '../components/admin/TopHeader';
import AdminFooter from '../components/admin/AdminFooter';
import DashboardHome from '../components/admin/DashboardHome';
import ContactData from '../components/admin/ContactData';
import CareerApplications from '../components/admin/CareerApplications';
import GalleryManager from '../components/admin/GalleryManager';
import Settings from '../components/admin/Settings';

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f8fafc;
`;

const MainContent = styled.div`
  flex: 1;
  margin-left: ${props => props.sidebarOpen ? '250px' : '70px'};
  transition: margin-left 0.3s ease;
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 20px;
  margin-top: 60px;
  margin-bottom: 60px;
  overflow-y: auto;
`;

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardHome />;
      case 'contact':
        return <ContactData />;
      case 'careers':
        return <CareerApplications />;
      case 'gallery':
        return <GalleryManager />;
      case 'settings':
        return <Settings />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <DashboardContainer>
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        sidebarOpen={sidebarOpen}
      />
      <MainContent sidebarOpen={sidebarOpen}>
        <TopHeader 
          onLogout={handleLogout} 
          toggleSidebar={toggleSidebar}
          sidebarOpen={sidebarOpen}
        />
        <ContentArea>
          {renderSection()}
        </ContentArea>
        <AdminFooter sidebarOpen={sidebarOpen} />
      </MainContent>
    </DashboardContainer>
  );
};

export default AdminDashboard;
