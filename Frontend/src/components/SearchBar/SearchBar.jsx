import React, {useContext} from 'react'
import {Context} from '../../context/ContextProvider';
import { assets } from "../../assets/assets";



function SearchBar() {
  const { onSend, selectedChat, setLoading, setInput, input } = useContext(Context);

    


  return (
    <>
      <form
        className="search-box"
        onSubmit={(e) => {
          e.preventDefault();

          onSend(input, selectedChat);
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