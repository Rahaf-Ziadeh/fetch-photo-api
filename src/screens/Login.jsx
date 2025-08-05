import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "../screens/screens.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (!user.emailVerified) {
        setMsg("Please verify your email before logging in.");
        return;
      }

      setMsg("Login successful!");
    
    } catch (error) {
      setMsg(error.message);
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <p>Enter your credentials to log in.</p>
      <hr />

      {msg && (
        <p style={{ color: msg.includes("successful") ? "green" : "red" }}>
          {msg}
        </p>
      )}

      <form onSubmit={handleLogin}>
        <label>
          <b>Email</b>
        </label>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="clearfix">
          <button type="submit" className="signupbtn">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
