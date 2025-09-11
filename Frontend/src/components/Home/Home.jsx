import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { io } from "socket.io-client";
import "./Home.css";
import { assets } from "../../assets/assets";
import { Context } from "../../Context/ContextProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Welcome from "../Welcome/Welcome";
import Chats from "../Chats/Chats";
import axios from "axios";
import SearchBar from "../SearchBar/SearchBar";

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
    setChats
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
      <div className="main-container">
        <div className="result">
          {selectedChat ? <Chats selectedChat={selectedChat} /> : <Welcome />}
        </div>

        <div className="main-bottom">
          {selectedChat && <SearchBar />}
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
