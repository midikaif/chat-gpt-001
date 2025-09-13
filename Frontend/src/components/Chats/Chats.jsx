import { useContext, useEffect } from "react";
import { assets } from "../../assets/assets";
import { Context } from "../../context/ContextProvider";
import axios from "axios";
import Welcome from "../Welcome/Welcome";
import { io } from "socket.io-client";

function Chats({ selectedChat }) {
  const {
    loading,
    prevPrompts,
    setPrevPrompts,
    setLoading,
    setSocket,
  } = useContext(Context);


  useEffect(() => {
    axios
      .get(`https://llmmodel-midikaif.onrender.com/api/chat/${selectedChat}`, {
        withCredentials: true,
      })
      .then((response) => {
        const result = response.data.chat;

        setPrevPrompts(result);
      })
      .catch((error) => {
        console.error("Error fetching chat data:", error);
      });
  }, [selectedChat]);

  useEffect(() => {
    const tempSocket = io("https://llmmodel-midikaif.onrender.com", {
      withCredentials: true,
    });

    tempSocket.on("ai-response", (message) => {
      setPrevPrompts((prev) => [
        ...prev,
        {
          role: "model",
          content: message.content,
        },
      ]);
      setLoading(false);
    });

    setSocket(tempSocket);
  }, [setSocket, setPrevPrompts]);

  return prevPrompts.length === 0 ? (
    <Welcome />
  ) : (
    prevPrompts.map((prompt, index) => (
      <div key={index}>
        {prompt.role === "user" && (
          <div className="user">
            <img src={assets.user_icon} alt="user icon" />
            <p>{prompt.content}</p>
          </div>
        )}
        {prompt.role === "model" && (
          <div className="ai">
            <img src={assets.gemini_icon} alt="gemini icon" />
            <p dangerouslySetInnerHTML={{ __html: prompt.content }}></p>
          </div>
        )}
        {prevPrompts.length - 1 === index && loading && (
          <div className="ai">
            <img src={assets.gemini_icon} alt="gemini icon" />
            <div className="loader">
              <hr />
              <hr />
              <hr />
            </div>
          </div>
        )}
      </div>
    ))
  );
}

export default Chats;
