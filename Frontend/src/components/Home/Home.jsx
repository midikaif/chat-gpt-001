import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { io } from "socket.io-client";
import "./Home.css";
import { assets } from "../../assets/assets";
import { Context } from "../../Context/ContextProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Welcome from "../Welcome/Welcome";
import Chats from "../Chats/Chats";

function Home() {
  const {
    onSend,
    userPrompt,
    showResult,
    loading,
    aiPrompt,
    setInput,
    input,
    selectedChat,
    setLoading,
    setSelectedChat,
  } = useContext(Context);

  const location = useLocation();
  const navigate = useNavigate();
  console.log(aiPrompt.chat === selectedChat);

  const cookies = Cookies.get("token");

  useEffect(() => {
    const path = location.pathname;

    if (!cookies && path !== "/login" && path !== "/signup") {
      navigate("/login", { replace: true });
    }
  }, [location.pathname]);

  return (
    <div className="main">
      <div className="nav">
        <p>Humen</p>
        <img src={assets.user_icon} alt="user icon" />
      </div>
      {/* {selectedChat && */}
      <div className="main-container">
        {selectedChat ? <Chats selectedChat={selectedChat} /> : <Welcome />}

        <div className="main-bottom">
          <form
            className="search-box"
            onSubmit={(e) => {
              e.preventDefault();

              onSend(input, selectedChat);
              setLoading(false);
              setInput("");
            }}
          >
            <input
              type="text"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              placeholder="Enter a prompt here..."
            />
            <div>
              <img src={assets.gallery_icon} alt="gallery icon" />
              <img src={assets.mic_icon} alt="mic icon" />
              <img
                src={assets.send_icon}
                onClick={() => onSend(input, selectedChat)}
                alt="send icon"
              />
            </div>
          </form>
          <div className="bottom-info">
            Humen may display inaccurate info, including about people, so double
            check its responses. Your privacy and Humen app.
          </div>
        </div>
      </div>
      {/* } */}
    </div>
  );
}

export default Home;
