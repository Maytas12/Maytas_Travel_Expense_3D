import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarker, FaCalendarAlt } from 'react-icons/fa';

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
  background: ${props => props.status === 'new' ? '#e3f2fd' : '#f3e5f5'};
  color: ${props => props.status === 'new' ? '#1976d2' : '#7b1fa2'};
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

const ContactData = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch contact data from API or use sample data
    const sampleContacts = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 234 567 8900',
        subject: 'General Inquiry',
        message: 'I would like to know more about your services.',
        date: '2024-01-15',
        status: 'new'
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        phone: '+1 234 567 8901',
        subject: 'Career Opportunity',
        message: 'Interested in job openings.',
        date: '2024-01-14',
        status: 'read'
      },
      {
        id: 3,
        name: 'Mike Johnson',
        email: 'mike.j@example.com',
        phone: '+1 234 567 8902',
        subject: 'Partnership',
        message: 'Looking for partnership opportunities.',
        date: '2024-01-13',
        status: 'new'
      },
    ];
    setContacts(sampleContacts);
  }, []);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const handleMarkAsRead = (id) => {
    setContacts(contacts.map(contact => 
      contact.id === id ? { ...contact, status: 'read' } : contact
    ));
  };

  return (
    <Container>
      <Header>
        <Title>Contact Messages</Title>
        <SearchBar
          type="text"
          placeholder="Search contacts..."
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
              <Th>Subject</Th>
              <Th>Date</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map((contact) => (
              <Tr key={contact.id}>
                <Td>{contact.name}</Td>
                <Td>{contact.email}</Td>
                <Td>{contact.phone}</Td>
                <Td>{contact.subject}</Td>
                <Td>
                  <FaCalendarAlt style={{ marginRight: '5px' }} />
                  {contact.date}
                </Td>
                <Td>
                  <StatusBadge status={contact.status}>
                    {contact.status}
                  </StatusBadge>
                </Td>
                <Td>
                  <ActionButton
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleMarkAsRead(contact.id)}
                  >
                    Mark Read
                  </ActionButton>
                  <ActionButton
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDelete(contact.id)}
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

export default ContactData;
