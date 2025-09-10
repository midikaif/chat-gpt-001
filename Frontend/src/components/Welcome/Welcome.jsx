import Cookies from "js-cookie";
import {assets} from "../../assets/assets";
import "./Welcome.css";


function Welcome() {
  const cookies = Cookies.get("token");

  return (
    <>
      <div className="greet">
        <p>
          <span>Hello, Dev.</span>
        </p>
        <p>How can I help you today?</p>
      </div>
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
    </>
  );
}

export default Welcome;
