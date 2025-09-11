import Cookies from "js-cookie";
import { assets } from "../../assets/assets";
import "./Welcome.css";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/ContextProvider";
import RecentChats from "../RecentChats/RecentChats";
import axios from "axios";
import Cards from "../Cards/Cards";

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
        console.log(chats);
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
      {!selectedChat && chats.length > 0 ? (
        <div className="info">
          <p>Select a chat to view the conversation</p>
          <div className="recent-chats">
            <RecentChats chats={chats} />
          </div>
        </div>
      ): (<Cards/>)}
    </>
  );
}

export default Welcome;
