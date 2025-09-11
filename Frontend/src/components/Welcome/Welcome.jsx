import Cookies from "js-cookie";
import { assets } from "../../assets/assets";
import "./Welcome.css";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/ContextProvider";
import RecentChats from "../RecentChats/RecentChats";
import axios from "axios";

function Welcome() {
  const cookies = Cookies.get("token");
  const [chats, setChats] = useState([]);

  const { user, selectedChat, notification, setNotification, extended, setExtended } = useContext(Context);
//   console.log(user);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/chat", {
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
    <>
      <div className="greet">
        <p>
          <span>Hey, {user?.fullName.firstName || "there"}.</span>
        </p>
        <p>How can I help you today?</p>
      </div>
      {selectedChat ? (
        <div className="cards">
          <div className="card">
            <p>Suggest beautiful places to see on an upcoming road trip</p>
            <img src={assets.compass_icon} alt="compass icon" />
          </div>
          <div className="card">
            <p>Briefly summarize this concept: urban planning</p>
            <img src={assets.bulb_icon} alt="bulb icon" />
          </div>
          <div className="card">
            <p>Brainstorm team bonding activities for our work retreat</p>
            <img src={assets.message_icon} alt="message icon" />
          </div>
          <div className="card">
            <p>Improve the readabilty of the following code</p>
            <img src={assets.code_icon} alt="code icon" />
          </div>
        </div>
      ) : (
        <div className="info">
          <p>Select a chat to view the conversation</p>
          <div className="recent-chats">
            <RecentChats chats={chats} />
          </div>
        </div>
      )}
    </>
  );
}

export default Welcome;
