import React, { createContext, useState, useContext } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your Maytas assistant. How can I help you today? You can ask me about travel booking, expense management, pricing, or support.",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const addMessage = (message) => {
    setMessages(prev => [...prev, message]);
  };

  const toggleChat = () => {
    setIsChatOpen(prev => !prev);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const value = {
    messages,
    isChatOpen,
    isTyping,
    addMessage,
    toggleChat,
    clearMessages,
    setIsTyping
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
