import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./LoginSignup.css";
import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

function LoginSignup() {
  const location = useLocation();
  const navigate = useNavigate();
  // Determine initial action from path

  const getActionFromPath = (pathname) => {
    if (pathname === "/login") return "login";
    return "sign up";
  };

  const [action, setAction] = useState(getActionFromPath(location.pathname));
  // Form state
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // You can replace this with your actual submit logic

    if (action === "sign up") {
      alert(
        `Sign Up\nFirst Name: ${form.firstName}\nLast Name: ${form.lastName}\nEmail: ${form.email}\nPassword: ${form.password}`
      );
    } else {
      alert(`Login\nEmail: ${form.email}\nPassword: ${form.password}`);
    }
  };

  useEffect(() => {
    setAction(getActionFromPath(location.pathname));
  }, [location.pathname]);

  return (
    <div className="container">
      <div className="header">
        <div className="text">
          {action.charAt(0).toUpperCase() + action.slice(1)}
        </div>
        <div className="underline"></div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Form submitted:", e);
        }}
      >
        <div className="inputs">
          {action === "sign up" && (
            <div className="input name">
              <FaUserAlt className="icon" />
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={form.firstName}
                onChange={handleInput}
              />
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={form.lastName}
                onChange={handleInput}
              />
            </div>
          )}
          <div className="input">
            <MdEmail className="icon" />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={form.email}
              onChange={handleInput}
            />
          </div>
          <div className="input">
            <RiLockPasswordLine className="icon" />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={form.password}
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="submit-container">
          <button
            className={action === "sign up" ? "submit" : "submit inactive"}
            tabIndex={0}
            onClick={() => {
              if (action !== "sign up") {
                navigate("/signup");
              } else {
                handleSubmit();
              }
            }}
            // onKeyDown={(e) => {
            //   if (e.key === "Enter" && action === "sign up") {
            //     handleSubmit();
            //   }
            // }}
          >
            Sign Up
          </button>
          <button
            className={action === "login" ? "submit" : "submit inactive"}
            tabIndex={0}
            onClick={(e) => {
              if (action !== "login") {
                navigate("/login");
              } else {
                handleSubmit();
              }
            }}
            // onKeyDown={(e) => {
            //   if (e.key === "Enter" && action === "login") {
            //     handleSubmit();
            //   }
            // }}
          >
            Log in
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginSignup;
