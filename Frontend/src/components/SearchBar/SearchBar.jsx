import  {useContext} from 'react'
import {Context} from '../../context/ContextProvider';
import { assets } from "../../assets/assets";



function SearchBar() {
  const { selectedChat, setLoading, setInput, input, setPrevPrompts, setShowResult } = useContext(Context);

// const onSend = async (prompt, chatId) => {
//   setLoading(true);
//   setShowResult(true);
//   setPrevPrompts((prev) => [
//     ...prev,
//     {
//       user: {
//         chat: chatId,
//         content: prompt,
//       },
//     },
//   ]);
//   console.log(prevPrompts);
//   tempSocket.emit("ai-message", {
//     chat: chatId,
//     content: prompt,
//   });

//   tempSocket.on("ai-response", (message) => {
//     console.log("Message from server:", message);
//     setPrevPrompts((prev) => [
//       ...prev,
//       {
//         ai: message,
//       },
//     ]);
//     setLoading(false);
//   });
// };

  return (
    <>
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
    </>
  );
}

export default SearchBar