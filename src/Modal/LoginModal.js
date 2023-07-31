import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../css/loginModal.css";
import "boxicons";
import axios from "axios";

const LoginModal = (props) => {
  const [emailLog, setEmailLog] = useState("");
  const [passwordLog, setPasswordLog] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [LoggedIn, setLoggedIn] = useState("");

  const login = (props) => {
    axios
    .post("https://bvb-backend.onrender.com/login", {
      email: emailLog,
      password: passwordLog,
    })
    .then((response) => {
      console.log(response)
      if (response.data.message) {
        setLoginMessage(response.data.message);
        setLoggedIn("");
      } else {
        setLoginMessage("");
        setLoggedIn("Signed In!");
        setEmailLog("");
        setPasswordLog("");
      }
      });
  };
  return ReactDOM.createPortal(
    <div className="modal-container">
      <div className="username-container">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          onChange={(e) => {
            setEmailLog(e.target.value);
          }}
          value={emailLog}
        />
      </div>
      <div className="password-container">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          onChange={(e) => {
            setPasswordLog(e.target.value);
          }}
          value={passwordLog}
        />
      </div>
      <div className="modal-button">
        <button type="submit" className="log-in" onClick={login}>
          LOG IN
        </button>
      </div>
      <div className="question">
        <p>
          Don't have account? <a onClick={props.onShowSignIn}>Sign in</a>
        </p>
        <p className="login-info">{loginMessage}</p>
        <p className="login-success">{LoggedIn}</p>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default LoginModal;
