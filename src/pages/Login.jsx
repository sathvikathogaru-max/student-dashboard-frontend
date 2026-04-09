import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const API = "https://YOUR_RENDER_BACKEND_URL.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {

      // Teacher login
      let response = await fetch(`${API}/teacher-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        let data = await response.json();

        if (data.success) {
          localStorage.setItem("loggedInUser", JSON.stringify(data.user));
          navigate("/teacher");
          return;
        }
      }

      // Student login
      response = await fetch(`${API}/student-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        let data = await response.json();

        if (data.success) {
          localStorage.setItem("loggedInUser", JSON.stringify(data.user));
          navigate("/student");
          return;
        }
      }

      setError("Invalid email or password");

    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
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