import React, { useContext, useEffect } from "react";
import Cookies from "js-cookie";
import "./Home.css";
import { assets } from "../../assets/assets";
import { Context } from "../../Context/ContextProvider";
import {useLocation, useNavigate} from "react-router-dom";

function Home() {
  const {
    onSend,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  const location = useLocation();
  const navigate = useNavigate();

  const cookies = Cookies.get("token");

  useEffect(() => {
    const path = location.pathname;

    console.log(path);

    if (!cookies && path !== "/login" && path !== "/signup") {
      navigate("/login", { replace: true });
    }
  }, [location.pathname]);


  return (
    <div className="main">
      <div className="nav">
        <p>Humen</p>
        <img src={assets.user_icon} alt="user icon" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev.</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            {cookies ? (
              <div className="cards">
                <div className="card">
                  <p>
                    Suggest beautiful places to see on an upcoming road trip
                  </p>
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
              <></>
            )}
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="user icon" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="gemini icon" />
              <div className="loader">
                <hr />
                <hr />
                <hr />
              </div>
              {/* <p dangerouslySetInnerHTML={{__html: resultData}}></p> */}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
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
                onClick={() => onSend(input)}
                alt="send icon"
              />
            </div>
          </div>
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
