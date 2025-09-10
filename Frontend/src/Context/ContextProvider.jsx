import { io } from "socket.io-client";
import { createContext, useState } from "react";

const Context = createContext();

export {Context};

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  
  const [selectedChat, setSelectedChat] = useState(null);


  const tempSocket = io("http://localhost:3000", { withCredentials: true });

    


  const onSend = async (prompt,chatId) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(prompt);
    

    tempSocket.emit("ai-message", {
      chat: chatId,
      content: prompt,
    });

    tempSocket.on("ai-response", (message) => {
      console.log("Message from server:", message);
      setResultData(message.content);
    });
    
  
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSend,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    setLoading,
    resultData,
    input,
    setInput,
    selectedChat,
    setSelectedChat,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
