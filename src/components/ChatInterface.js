import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaPaperPlane } from 'react-icons/fa';
import ChatMessage from './ChatMessage';
import { useChat } from '../context/ChatContext';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InputContainer = styled.div`
  padding: 15px;
  border-top: 1px solid #eee;
  display: flex;
  gap: 10px;
  align-items: center;
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 25px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const SendButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    transform: scale(1.1);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: scale(1);
  }
`;

const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 10px 15px;
  font-size: 14px;
  color: #666;
  font-style: italic;
`;

const QuickRepliesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0 15px 10px;
`;

const QuickReplyButton = styled.button`
  padding: 8px 15px;
  background: ${({ theme }) => theme.colors.light};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 20px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;

const ChatInterface = () => {
  const { messages, addMessage, isTyping, setIsTyping } = useChat();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const quickReplies = [
    "Travel booking",
    "Expense management",
    "Pricing",
    "Support"
  ];

  const botResponses = {
    "hello": "Hello! I'm your Maytas assistant. How can I help you today?",
    "hi": "Hi there! Welcome to Maytas. What would you like to know?",
    "travel booking": "Our travel booking feature allows you to book flights, hotels, and cars with corporate rates. Would you like a demo?",
    "expense management": "Our expense management system automates expense reporting with receipt capture and policy compliance. It's really easy to use!",
    "pricing": "We offer flexible pricing plans based on your company size. Would you like to schedule a demo to discuss pricing?",
    "support": "Our support team is available 24/7. You can reach us at support@maytas.com or call +1-800-MAYTAS"
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      addMessage({
        id: Date.now(),
        text: inputValue,
        sender: 'user',
        timestamp: new Date()
      });
      
      setInputValue('');
      setIsTyping(true);

      // Simulate bot response
      setTimeout(() => {
        const lowerInput = inputValue.toLowerCase();
        let response = "I'm here to help! You can ask me about travel booking, expense management, pricing, or support.";
        
        for (const [key, value] of Object.entries(botResponses)) {
          if (lowerInput.includes(key)) {
            response = value;
            break;
          }
        }

        addMessage({
          id: Date.now() + 1,
          text: response,
          sender: 'bot',
          timestamp: new Date()
        });
        
        setIsTyping(false);
      }, 1000);
    }
  };

  const handleQuickReply = (reply) => {
    addMessage({
      id: Date.now(),
      text: reply,
      sender: 'user',
      timestamp: new Date()
    });
    
    setIsTyping(true);
    
    setTimeout(() => {
      const response = botResponses[reply.toLowerCase()] || "Let me help you with that!";
      
      addMessage({
        id: Date.now() + 1,
        text: response,
        sender: 'bot',
        timestamp: new Date()
      });
      
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <ChatContainer>
      <MessagesContainer>
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        
        {isTyping && (
          <TypingIndicator>
            <span>Maytas Assistant is typing...</span>
          </TypingIndicator>
        )}
        
        <div ref={messagesEndRef} />
      </MessagesContainer>
      
      <QuickRepliesContainer>
        {quickReplies.map((reply, index) => (
          <QuickReplyButton key={index} onClick={() => handleQuickReply(reply)}>
            {reply}
          </QuickReplyButton>
        ))}
      </QuickRepliesContainer>
      
      <InputContainer>
        <MessageInput
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
        <SendButton onClick={handleSendMessage} disabled={!inputValue.trim()}>
          <FaPaperPlane />
        </SendButton>
      </InputContainer>
    </ChatContainer>
  );
};

export default ChatInterface;
