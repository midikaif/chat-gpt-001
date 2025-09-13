import { useContext, useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import "./Home.css";
import { assets } from "../../assets/assets";
import { useLocation, useNavigate } from "react-router-dom";
import Welcome from "../Welcome/Welcome";
import Chats from "../Chats/Chats";
import SearchBar from "../SearchBar/SearchBar";
import { Context } from "../../context/ContextProvider";

function Home() {
  const { selectedChat, prevPrompts } = useContext(Context);

  const [showSignout, setShowSignout] = useState(false);

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

  const handleSignout = () => {
    Cookies.remove("token");
    setShowSignout(false);
    navigate("/login", { replace: true });
  };

  return (
    <div className="main">
      <div className="nav">
        <p>Humen</p>
        <div style={{ position: "relative" }}>
          <img
            src={assets.user_icon}
            alt="user icon"
            style={{ cursor: "pointer" }}
            onClick={() => setShowSignout((prev) => !prev)}
          />
          {showSignout && (
            <div
              style={{
                position: "absolute",
                top: "110%",
                right: 0,
                background: "#fff",
                border: "1px solid #eee",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                padding: "12px 10px",
                zIndex: 10,
                minWidth: "120px",
                textAlign: "center",
              }}
            >
              <p style={{ margin: 0, color: "#3c009d", fontWeight: 500 }}>
                Sign out?
              </p>
              <button
                style={{
                  marginTop: "10px",
                  padding: "6px 18px",
                  borderRadius: "6px",
                  border: "none",
                  background: "#4b90ff",
                  color: "#fff",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
                onClick={handleSignout}
              >
                Sign out
              </button>
            </div>
          )}
        </div>
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
