import "./LoginSignup.css"
import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";


function LoginSignup() {
  return (
    <div className="container">
      <div className="header">
        <div className="text">Sign up</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input name">
          <FaUserAlt className="icon" />
          <input type="text" placeholder="First Name"/>
          <input type="text" placeholder="Last Name"/>
        </div>
        <div className="input">
          <MdEmail className="icon" />
          <input type="email" placeholder="email"/>
        </div>
        <div className="input">
          <RiLockPasswordLine className="icon" />
          <input type="password" placeholder="password"/>
        </div>
      </div>
<div className="forgot-password">Lost Password <span>click here</span></div>
      <div className="submit-container">
        <div className="submit">Sign Up</div>
        <div className="submit">Log in</div>
      </div>
    </div>
  );
}

export default LoginSignup