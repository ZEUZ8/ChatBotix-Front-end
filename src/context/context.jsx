import React, { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const useChat = () => {
  return useContext(ChatContext);
};

export const ChatProvider = ({ children }) => {
  const [chatLog, setChatLog] = useState([]);

  const clearTheChat = () => {
    setChatLog([]);
  };

  const addMessageToChatLog = (message) => {
    setChatLog((prevChatLog) => [...prevChatLog, message]);
  };

  return (
    <ChatContext.Provider
      value={{ chatLog, clearTheChat, addMessageToChatLog }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;