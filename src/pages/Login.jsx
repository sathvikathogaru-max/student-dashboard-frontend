import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Load users from localStorage or create default users
  const storedUsers = JSON.parse(localStorage.getItem("users")) || [
    { email: "teacher@example.com", password: "teacher123", role: "teacher", name: "Teacher" },
    { email: "student@example.com", password: "student123", role: "student", name: "Student" }
  ];

  localStorage.setItem("users", JSON.stringify(storedUsers));

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = storedUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      setError("");
      if (user) {
  localStorage.setItem("loggedInUser", JSON.stringify(user));

  if (user.role === "teacher") {
    navigate("/teacher");
  } else {
    navigate("/student");
  }
}
    } else {
      setError("Invalid email or password");
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