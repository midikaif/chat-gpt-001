import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./LoginSignup.css";
import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import axios from "axios";

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
    fullName: {
      firstName: "",
      lastName: "",
    },
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    // setForm({ ...form, [e.target.name]: e.target.value });


const { name, value } = e.target;
    if (name === "firstName" || name === "lastName") {
      setForm({
        ...form,
        fullName: {
          ...form.fullName,
          [name]: value,
        },
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };




  const handleSubmit = () => {
    console.log(action)
    
    axios
      .post(
        `http://localhost:3000/api/auth${location.pathname}`,
        {
          ...form,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log("Response:", response.data);
        navigate("/");
        // Handle successful response
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error response
      });
  };

  useEffect(() => {
    console.log(getActionFromPath(location.pathname));
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
          handleSubmit();
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
                value={form.fullName.firstName}
                onChange={handleInput}
              />
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={form.fullName.lastName}
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
          type="button"
            className={action === "sign up" ? "submit" : "submit inactive"}
            key={0}
            onClick={() => {
              if (action !== "sign up") {
                navigate("/signup");
              }else{
                handleSubmit();
              }
            }}
          >
            Sign Up
          </button>
          <button
            className={action === "login" ? "submit" : "submit inactive"}
            key={1}
            type="button"
            onClick={() => {
              if (action !== "login") {
                navigate("/login");
              }else{
                handleSubmit();
              }
            }}
          >
            Log in
          </button>
          <button type="submit" style={{ display: "none" }} />
        </div>
      </form>
    </div>
  );
}

export default LoginSignup;
