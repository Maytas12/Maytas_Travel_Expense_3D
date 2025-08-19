import React from 'react';
import styled from 'styled-components';
import { FaComments, FaTimes } from 'react-icons/fa';
import ChatInterface from './ChatInterface';
import { useChat } from '../context/ChatContext';

const ChatbotContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`;

const ChatButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    background: ${({ theme }) => theme.colors.accent};
  }
`;

const ChatWindow = styled.div`
  position: absolute;
  bottom: 80px;
  right: 0;
  width: 350px;
  height: 500px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  animation: slideIn 0.3s ease;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 480px) {
    width: 300px;
    height: 400px;
    right: -10px;
  }
`;

const ChatHeader = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChatTitle = styled.h3`
  margin: 0;
  font-size: 16px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
`;

const ChatbotWidget = () => {
  const { isChatOpen, toggleChat } = useChat();

  return (
    <ChatbotContainer>
      <ChatButton onClick={toggleChat}>
        {isChatOpen ? <FaTimes /> : <FaComments />}
      </ChatButton>
      
      <ChatWindow isOpen={isChatOpen}>
        <ChatHeader>
          <ChatTitle>Maytas Assistant</ChatTitle>
          <CloseButton onClick={toggleChat}>
            <FaTimes />
          </CloseButton>
        </ChatHeader>
        <ChatInterface />
      </ChatWindow>
    </ChatbotContainer>
  );
};

export default ChatbotWidget;
