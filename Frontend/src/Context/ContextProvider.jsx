import { io } from "socket.io-client";
import { createContext, useState } from "react";

const Context = createContext();

export { Context };

const ContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [input, setInput] = useState("");
  const [userPrompt, setUserPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiPrompt, setAiPrompt] = useState({});
  const [notification, setNotification] = useState("");
  const [extended, setExtended] = useState(false);

  const [selectedChat, setSelectedChat] = useState(null);

  const tempSocket = io("http://localhost:3000", { withCredentials: true });

  const onSend = async (prompt, chatId) => {
    setAiPrompt({});
    setLoading(true);
    setShowResult(true);
    setUserPrompt(prompt);
    setPrevPrompts((prev) => [
      ...prev,
      {
        user: {
          chat: chatId,
          content: prompt,
        }
      },
    ]);
    console.log(prevPrompts)
    tempSocket.emit("ai-message", {
      chat: chatId,
      content: prompt,
    });

    tempSocket.on("ai-response", (message) => {
      console.log("Message from server:", message);
      setAiPrompt(message);
      setPrevPrompts((prev) => [
        ...prev,
        {
          ai: message,
        }
      ]);
      setLoading(false);
    });
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
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
