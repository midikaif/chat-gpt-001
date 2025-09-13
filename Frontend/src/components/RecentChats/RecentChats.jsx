import { useContext, useEffect } from "react";
import { Context } from "../../context/ContextProvider";
import { assets } from "../../assets/assets";
import "./RecentChats.css";
import {MdDelete} from "react-icons/md";
import axios from "axios";

function RecentChats({ chats }) {
  const { selectedChat, setSelectedChat,setExtended, setNotification, showNotification } =
    useContext(Context);

    function onDeleteChat(){
      setNotification('Chat deleted successfully!')
      axios.delete(`http://localhost:3000/api/chat/${selectedChat}`,{withCredentials: true})
      .then((res)=>{
        console.log(res);
      })
      .catch((err)=>{
        console.log(err);
      })
      showNotification();
    }
// useEffect(()=>{
// })


  return (
    <>
      {chats.map((chat, index) => (
        <div
          className={`recent-entry-container${
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
          <div className={`recent-entry`}>
            <img src={assets.message_icon} alt="message icon" />
            <p>{chat.title}</p>
          </div>
          <div className="chat-delete" onClick={() => onDeleteChat(chat._id)}>
            <MdDelete opacity={"0.5"} cursor={"pointer"} />
          </div>
        </div>
      ))}
    </>
  );
}

export default RecentChats;
