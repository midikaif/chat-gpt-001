import { useContext, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import "./Home.css";
import { assets } from "../../assets/assets";
import { useLocation, useNavigate } from "react-router-dom";
import Welcome from "../Welcome/Welcome";
import Chats from "../Chats/Chats";
import SearchBar from "../SearchBar/SearchBar";
import { Context } from "../../context/ContextProvider";

function Home() {
  const {
    selectedChat,
    prevPrompts
  } = useContext(Context);

  const location = useLocation();
  const navigate = useNavigate();

  const cookies = Cookies.get("token");

  const resultRef = useRef(null);

  useEffect(() => {
    const path = location.pathname;

    if (!cookies && path !== "/login" && path !== "/signup") {
      navigate("/login", { replace: true });
    }
  }, [location.pathname]);

  useEffect(() => {
    if (resultRef.current) {
      resultRef.current.scrollTop = resultRef.current.scrollHeight;
    }
  }, [prevPrompts]);

  return (
    <div className="main">
      <div className="nav">
        <p>Humen</p>
        <img src={assets.user_icon} alt="user icon" />
      </div>
      <div className="main-container">
        <div className="result" ref={resultRef}>
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
    </div>
  );
}

export default Home;
