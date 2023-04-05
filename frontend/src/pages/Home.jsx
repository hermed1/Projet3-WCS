import React, { useState } from "react";
import axios from "axios";
import "./Home.css";

function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  const login = () => {
    axios
      .post("http://localhost:3000/login", {
        email,
        password,
      })
      .then((response) => {
        if (!response.data.message) {
          setLoginStatus(response.data.message);
        } else {
          setLoginStatus(response.data[0].message);
        }
      });
  };

  return (
    <>
      <div className="login">
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Email…"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />{" "}
        <br />
        <input
          type="password"
          placeholder="Password…"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="button" onClick={login}>
          Login
        </button>
      </div>
      <h1> {loginStatus}</h1>
    </>
  );
}

export default Home;
