import React, { useContext } from "react";
import { Context } from "../../context/ContextProvider";
import { assets } from "../../assets/assets";
import "./RecentChats.css";
import Welcome from "../Welcome/Welcome";

function RecentChats({ chats }) {
  const { selectedChat, setSelectedChat,setExtended } =
    useContext(Context);
    console.log(chats.length);

  return (
    <>
      {
      chats.map((chat, index) => (
        <div
          className={`recent-entry${
            selectedChat === chat._id ? " selected" : ""
          }`}
          key={index}
          onClick={() => {
            setExtended(true);
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
      ))
      
      }
    </>
  );
}

export default RecentChats;
