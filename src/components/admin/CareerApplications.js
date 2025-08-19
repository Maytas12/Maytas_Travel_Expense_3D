import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaFilePdf, FaCalendarAlt, FaBriefcase } from 'react-icons/fa';

const Container = styled.div`
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  color: #333;
  margin: 0;
`;

const SearchBar = styled.input`
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 25px;
  width: 300px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #667eea;
  }
`;

const TableContainer = styled(motion.div)`
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 15px;
  text-align: left;
  font-weight: 600;
`;

const Td = styled.td`
  padding: 15px;
  border-bottom: 1px solid #eee;
`;

const Tr = styled.tr`
  &:hover {
    background-color: #f8f9fa;
  }
`;

const StatusBadge = styled.span`
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: 600;
  background: ${props => 
    props.status === 'new' ? '#e3f2fd' : 
    props.status === 'reviewed' ? '#fff3e0' : '#e8f5e8'};
  color: ${props => 
    props.status === 'new' ? '#1976d2' : 
    props.status === 'reviewed' ? '#f57c00' : '#388e3c'};
`;

const ActionButton = styled(motion.button)`
  background: none;
  border: none;
  color: #667eea;
  cursor: pointer;
  padding: 5px;
  margin: 0 2px;
  font-size: 14px;
  transition: color 0.3s;

  &:hover {
    color: #764ba2;
  }
`;

const DownloadButton = styled(motion.a)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 5px 10px;
  border-radius: 15px;
  text-decoration: none;
  font-size: 12px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-1px);
  }
`;

const CareerApplications = () => {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch career applications from API or use sample data
    const sampleApplications = [
      {
        id: 1,
        name: 'Alice Johnson',
        email: 'alice.j@example.com',
        phone: '+1 234 567 8900',
        position: 'Frontend Developer',
        experience: '3 years',
        resume: 'resume1.pdf',
        date: '2024-01-15',
        status: 'new'
      },
      {
        id: 2,
        name: 'Bob Williams',
        email: 'bob.w@example.com',
        phone: '+1 234 567 8901',
        position: 'Backend Developer',
        experience: '5 years',
        resume: 'resume2.pdf',
        date: '2024-01-14',
        status: 'reviewed'
      },
      {
        id: 3,
        name: 'Carol Davis',
        email: 'carol.d@example.com',
        phone: '+1 234 567 8902',
        position: 'UI/UX Designer',
        experience: '4 years',
        resume: 'resume3.pdf',
        date: '2024-01-13',
        status: 'shortlisted'
      },
    ];
    setApplications(sampleApplications);
  }, []);

  const filteredApplications = applications.filter(application =>
    application.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    application.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    application.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusChange = (id, newStatus) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    ));
  };

  const handleDelete = (id) => {
    setApplications(applications.filter(app => app.id !== id));
  };

  return (
    <Container>
      <Header>
        <Title>Career Applications</Title>
        <SearchBar
          type="text"
          placeholder="Search applications..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Header>

      <TableContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Table>
          <thead>
            <tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Phone</Th>
              <Th>Position</Th>
              <Th>Experience</Th>
              <Th>Resume</Th>
              <Th>Date</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((application) => (
              <Tr key={application.id}>
                <Td>
                  <FaUser style={{ marginRight: '5px' }} />
                  {application.name}
                </Td>
                <Td>
                  <FaEnvelope style={{ marginRight: '5px' }} />
                  {application.email}
                </Td>
                <Td>
                  <FaPhone style={{ marginRight: '5px' }} />
                  {application.phone}
                </Td>
                <Td>
                  <FaBriefcase style={{ marginRight: '5px' }} />
                  {application.position}
                </Td>
                <Td>{application.experience}</Td>
                <Td>
                  <DownloadButton 
                    href={`/uploads/${application.resume}`} 
                    download
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaFilePdf />
                    Download
                  </DownloadButton>
                </Td>
                <Td>
                  <FaCalendarAlt style={{ marginRight: '5px' }} />
                  {application.date}
                </Td>
                <Td>
                  <StatusBadge status={application.status}>
                    {application.status}
                  </StatusBadge>
                </Td>
                <Td>
                  <ActionButton
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleStatusChange(application.id, 'reviewed')}
                  >
                    Review
                  </ActionButton>
                  <ActionButton
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleStatusChange(application.id, 'shortlisted')}
                  >
                    Shortlist
                  </ActionButton>
                  <ActionButton
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDelete(application.id)}
                  >
                    Delete
                  </ActionButton>
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default CareerApplications;
