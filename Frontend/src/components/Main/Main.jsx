import React from "react";
import './Main.css'
import { assets } from "../../assets/assets";

function Main() {
  return (
    <div className="main">
      <div className="nav">
        <p>Humen</p>
        <img src={assets.user_icon} alt="user icon" />
      </div>
    </div>
  );
}

export default Main;
