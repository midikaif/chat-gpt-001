import React, { useContext, useEffect } from "react";
import { assets } from "../../assets/assets";
import { Context } from "../../context/ContextProvider";
import axios from "axios";


function Chats({selectedChat}) {
  const { userPrompt, aiPrompt, prevPrompts, setPrevPrompts } = useContext(Context);

//   useEffect(() => {
//     axios.get(`http://localhost:3000/api/chat/${selectedChat}`, { withCredentials: true })
//       .then((response) => {
//         const result = response.data.chat;
//         console.log(result);
//         result.map((item) => {
//             const role = item.role;
//             const content = item.content;
//             setPrevPrompts((prev) => {
//                 prev.push({ [role]: content });
//                 return prev;
//             });
//         });
//         console.log(prevPrompts);
//         // Update the context with the fetched prompts
//       })
//       .catch((error) => {
//         console.error("Error fetching chat data:", error);
//       });
//   }, []);


  return prevPrompts.map((prompt, index) => {
    return (

      <div className="result" key={index}>
        <div className="user">
          <img src={assets.user_icon} alt="user icon" />
          <p>{prompt.user.content}</p>
        </div>
        <div className="ai">
          <img src={assets.gemini_icon} alt="gemini icon" />
          {!prompt.model.content ? (
            <div className="loader">
              <hr />
              <hr />
              <hr />
            </div>
          ) : (
            <p dangerouslySetInnerHTML={{ __html: prompt.model.content }}></p>
          )}
      </div>
    </div>

    );
  });
}

export default Chats;
