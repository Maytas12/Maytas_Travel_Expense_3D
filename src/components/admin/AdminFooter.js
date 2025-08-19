import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  padding: 15px;
  position: fixed;
  bottom: 0;
  left: ${props => props.sidebarOpen ? '250px' : '70px'};
  right: 0;
  transition: left 0.3s ease;
  font-size: 0.9rem;
  border-top: 1px solid #34495e;

  @media (max-width: 768px) {
    left: 0;
    position: relative;
    margin-top: auto;
  }
`;

const AdminFooter = ({ sidebarOpen }) => {
  return (
    <FooterContainer sidebarOpen={sidebarOpen}>
      © 2025 Maytas Travel Expense. All rights reserved.
    </FooterContainer>
  );
};

export default AdminFooter;
