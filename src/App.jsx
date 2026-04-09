import React, { useState } from "react";
import axios from "axios";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Backend API URL
  const API = "https://your-backend-name.onrender.com/teacher-login";

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(API, {
        email: email,
        password: password
      });

      console.log("Login Success:", response.data);
      alert("Login Successful!");

    } catch (error) {
      console.error("Login Error:", error);
      alert("Login Failed");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Teacher Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;