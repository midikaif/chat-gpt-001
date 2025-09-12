import { io } from "socket.io-client";
import { createContext, useEffect, useState } from "react";

const Context = createContext();

export { Context };

const ContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [input, setInput] = useState("");
  const [userPrompt, setUserPrompt] = useState("");
  const [aiPrompt, setAiPrompt] = useState({});
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState("");
  const [extended, setExtended] = useState(false);
  const [socket, setSocket] = useState(null);

  const [selectedChat, setSelectedChat] = useState(null);

  

  const onSend = async (prompt, chatId) => {
    setLoading(true);
    console.log(loading);
    setShowResult(true);
    console.log(prompt);
    setUserPrompt({
      user: {
        chat: chatId,
        content: prompt,
      },
    });
    setPrevPrompts((prev) => [
      ...prev,
      {
        role: "user",
        chat: chatId,
        content: prompt,
      },
    ]);

    socket.emit("ai-message", {
      chat: chatId,
      content: prompt,
    });

    console.log("Message sent to server");
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSend,
    setUserPrompt,
    userPrompt,
    showResult,
    loading,
    setLoading,
    aiPrompt,
    input,
    setInput,
    selectedChat,
    setSelectedChat,
    user,
    setUser,
    notification,
    setNotification,
    extended,
    setExtended,
    setSocket
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
