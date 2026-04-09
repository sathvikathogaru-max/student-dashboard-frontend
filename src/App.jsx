import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";

// backend base URL
axios.defaults.baseURL = "https://your-backend-url.onrender.com";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;