import React, { useContext, useEffect } from "react";
import { assets } from "../../assets/assets";
import { Context } from "../../context/ContextProvider";
import axios from "axios";
import Welcome from "../Welcome/Welcome";

function Chats({ selectedChat }) {
  const { userPrompt, aiPrompt, prevPrompts, setPrevPrompts } =
    useContext(Context);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/chat/${selectedChat}`, {
        withCredentials: true,
      })
      .then((response) => {
        const result = response.data.chat;
        console.log(result);
        setPrevPrompts(result);
        // result.map((item) => {
        //     const role = item.role;
        //     const content = item.content;
        //     setPrevPrompts((prev) => [...prev, { [role]: content }]);
        // });

        console.log(prevPrompts);

        // Update the context with the fetched prompts
      })
      .catch((error) => {
        console.error("Error fetching chat data:", error);
      });
  }, [selectedChat]);

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
          {!prompt.role === "model" ? (
            <div className="loader">
              <hr />
              <hr />
              <hr />
            </div>
          ) : (
            <p dangerouslySetInnerHTML={{ __html: prompt.content }}></p>
          )}
        </div>
      )}
    </div>
  )));
}
export default Chats;
