import { createContext, useState } from "react";
import { MdCheckCircle } from "react-icons/md";

const Context = createContext();

export { Context };

const ContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [input, setInput] = useState("");
  const [userPrompt, setUserPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState("");
  const [extended, setExtended] = useState(false);
  const [socket, setSocket] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [settings, setSettings] = useState(false);

  const onSend = async (prompt, chatId) => {
    setLoading(true);
    setShowResult(true);
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

  };

  const showNotification = () => {
    setTimeout(() => setNotification(""), 2000);

    return (
      <div className="notification" style={{}}>
        <MdCheckCircle size={24} style={{ marginRight: 6 }} />
        {notification}
      </div>
    );
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
    setSocket,
    settings,
    setSettings,
    showNotification
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
