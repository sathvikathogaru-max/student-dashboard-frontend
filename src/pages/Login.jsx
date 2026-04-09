import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      // try teacher login first
      let response = await fetch("http://localhost:5000/teacher-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      let data = await response.json();

      if (data.success) {
        localStorage.setItem("loggedInUser", JSON.stringify(data.user));
        navigate("/teacher");
        return;
      }

      // try student login
      response = await fetch("http://localhost:5000/student-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      data = await response.json();

      if (data.success) {
        localStorage.setItem("loggedInUser", JSON.stringify(data.user));
        navigate("/student");
      } else {
        setError("Invalid email or password");
      }

    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Welcome Back</h1>

        <form onSubmit={handleSubmit}>

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />

          {error && <p className="error">{error}</p>}

          <button type="submit">Login</button>

        </form>
      </div>
    </div>
  );
}

export default Login;