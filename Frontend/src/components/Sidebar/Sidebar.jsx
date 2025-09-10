import React, { useContext, useEffect, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { IoIosArrowBack, IoMdSend } from "react-icons/io";
import { MdCheckCircle } from "react-icons/md";
import { Context } from "../../context/ContextProvider";


function Sidebar() {

  const {selectedChat,setSelectedChat} = useContext(Context);

  const [extended, setExtended] = useState(false);
  const [chats, setChats] = useState([]);
  const [newChat, setNewChat] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [notification, setNotification] = useState("");

  
  
  const sendChat = (e) => {
    e.preventDefault();
    // Simulate chat creation success
    setChatInput("");
    setNotification("Chat created successfully!");
    setTimeout(() => setNotification(""), 2000);
  

    axios.post("http://localhost:3000/api/chat", { title: chatInput }, { withCredentials: true })
      .then((response) => {
        console.log("Chat created:", response.data);
        
      })
      .catch((error) => {
        console.error("Error creating chat:", error);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/chat/all", {
        withCredentials: true,
      })
      .then((response) => {
        const { chats } = response.data;
        setChats(chats);
      })
      .catch((error) => {
        console.error("Error fetching chat data:", error);
      });
  }, [notification]);



  return (
    <div className="sidebar">
      <div className="top">
        <img
          className="menu"
          onClick={() => {
            setExtended((prev) => !prev);
            if (newChat) setNewChat(false);
          }}
          src={assets.menu_icon}
          alt="menu icon"
        />

        <div className="new-chat">
          <div
            onClick={() => {
              setNewChat((prev) => !prev);
              setExtended(true);
            }}
            className="chat-icons"
          >
            {newChat ? (
              <IoIosArrowBack />
            ) : (
              <img src={assets.plus_icon} alt="" />
            )}
            {extended && !newChat && <p>New Chat</p>}
          </div>
          {newChat && extended && (
            <form
              className="chat-input-container"
              onSubmit={(e) => {
                sendChat(e);
              }}
            >
              <input
                type="text"
                className="chat-input"
                autoFocus
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                required
              />
              <button className="submit-btn" type="submit">
                <IoMdSend size={20} />
              </button>
            </form>
          
          )}
        </div>

        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {/* {chats.map((chat, index) => (
              <div className="recent-entry" key={index} onClick={()=> {
                setChatId(chat._id)

                }} > */}
            {chats.map((chat, index) => (
              <div
                className={`recent-entry${selectedChat === chat._id ? " selected" : ""}`}
                key={index}
                onClick={() => {
                  if (selectedChat === chat._id) {
                    setSelectedChat(null);
                    return;
                  }
                  setSelectedChat(chat._id);
                }}
              >
                <img src={assets.message_icon} alt="message icon" />
                <p>{chat.title}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      {notification && (
        <div className="notification"
          style={{

          }}
        >
          <MdCheckCircle size={24}  style={{ marginRight: 6 }} />
          {notification}
        </div>

)}
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="question icon" />
          {extended && <p>Help</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="history icon" />
          {extended && <p>Activity</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="setting icon" />
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
