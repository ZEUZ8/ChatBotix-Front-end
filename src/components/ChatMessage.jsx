import React from "react";
import Svg from "./Svg";

const ChatMessage = ({ message }) => {
  return (
    <div
      className={`chat-message ${message.user === "assistant" && "chatgpt"}`}
    >
      <div
        className={`chat-message-center ${
          message.user === "assistant" && "chatgpt"
        }`}
      >
        {message.user === "assistant" ? (
          <>
            <div
              className={`avathar ${message.user === "assistant" && "chatgpt"}`}
            >
              {message.user === "assistant" && <Svg />}
            </div>
            <div className="message">{message.message}</div>
          </>
        ) : (
          <>
            <div className="message">{message.message}</div>
            <div
              className={`avathar ${message.user === "assistant" && "chatgpt"}`}
            >
              {message.user === "assistant" && <Svg />}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
