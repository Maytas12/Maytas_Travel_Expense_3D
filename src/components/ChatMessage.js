import React from 'react';
import styled from 'styled-components';
import { FaUser, FaRobot } from 'react-icons/fa';

const MessageWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 10px;
  flex-direction: ${({ sender }) => sender === 'user' ? 'row-reverse' : 'row'};
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ sender }) => sender === 'user' ? '#667eea' : '#764ba2'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  flex-shrink: 0;
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: 12px 16px;
  border-radius: ${({ sender }) => sender === 'user' ? '15px 15px 0 15px' : '15px 15px 15px 0'};
  background: ${({ sender }) => sender === 'user' ? '#667eea' : '#f1f5f9'};
  color: ${({ sender }) => sender === 'user' ? 'white' : '#1f2937'};
  font-size: 14px;
  line-height: 1.4;
  word-wrap: break-word;
`;

const MessageTime = styled.div`
  font-size: 11px;
  color: #9ca3af;
  margin-top: 5px;
  text-align: ${({ sender }) => sender === 'user' ? 'right' : 'left'};
`;

const ChatMessage = ({ message }) => {
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <MessageWrapper sender={message.sender}>
      <Avatar sender={message.sender}>
        {message.sender === 'user' ? <FaUser /> : <FaRobot />}
      </Avatar>
      <div>
        <MessageBubble sender={message.sender}>
          {message.text}
        </MessageBubble>
        <MessageTime sender={message.sender}>
          {formatTime(message.timestamp)}
        </MessageTime>
      </div>
    </MessageWrapper>
  );
};

export default ChatMessage;
