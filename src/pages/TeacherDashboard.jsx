import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import "../styles/TeacherDashboard.css";

function TeacherDashboard() {

  const defaultStudents = [
    { name: "suri", email:"", password:"", role:"student", math: 0, physics: 0, biology: 0, grade: "", remarks: "", sports: "" },
    { name: "geetha", email:"", password:"", role:"student", math: 0, physics: 0, biology: 0, grade: "", remarks: "", sports: "" },
    { name: "sunitha", email:"", password:"", role:"student", math: 0, physics: 0, biology: 0, grade: "", remarks: "", sports: "" },
    { name: "rahul", email:"", password:"", role:"student", math: 0, physics: 0, biology: 0, grade: "", remarks: "", sports: "" },
    { name: "kalyan", email:"", password:"", role:"student", math: 0, physics: 0, biology: 0, grade: "", remarks: "", sports: "" },
    { name: "divya", email:"", password:"", role:"student", math: 0, physics: 0, biology: 0, grade: "", remarks: "", sports: "" }
  ];

  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("students");
    return saved ? JSON.parse(saved) : defaultStudents;
  });

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const calculateGrade = (math, physics, biology) => {
    const avg = (math + physics + biology) / 3;
    if (avg >= 90) return "A+";
    if (avg >= 75) return "A";
    if (avg >= 60) return "B";
    return "C";
  };

  const handleChange = (index, field, value) => {
    const updated = [...students];
    updated[index][field] = Number(value);
    updated[index].grade = calculateGrade(
      updated[index].math,
      updated[index].physics,
      updated[index].biology
    );
    setStudents(updated);
  };

  const marksAssigned = students.some(
    s => s.math > 0 || s.physics > 0 || s.biology > 0
  );

  let classAverage = 0;
  let topper = null;

  if (marksAssigned) {
    classAverage =
      students.reduce(
        (acc, s) => acc + (s.math + s.physics + s.biology) / 3,
        0
      ) / students.length;

    topper = [...students].sort(
      (a, b) =>
        (b.math + b.physics + b.biology) / 3 -
        (a.math + a.physics + a.biology) / 3
    )[0];
  }

  const chartData = marksAssigned
    ? [
        {
          subject: "Math",
          average:
            students.reduce((acc, s) => acc + s.math, 0) /
            students.length
        },
        {
          subject: "Physics",
          average:
            students.reduce((acc, s) => acc + s.physics, 0) /
            students.length
        },
        {
          subject: "Biology",
          average:
            students.reduce((acc, s) => acc + s.biology, 0) /
            students.length
        }
      ]
    : [];

  return (
    <div className="dashboard-container">
      <div className="dashboard-wrapper">

        <h1 className="dashboard-title">
          Teacher Analytics Dashboard
        </h1>

        {/* Stats */}
        <div className="stats-container">
          <div className="stat-box">
            Class Average <br />
            {marksAssigned ? classAverage.toFixed(2) : "--"}
          </div>
          <div className="stat-box">
            Top Performer <br />
            {marksAssigned && topper ? topper.name : "--"}
          </div>
          <div className="stat-box">
            Total Students <br />
            {students.length}
          </div>
        </div>

        {/* Add Student */}
        <div style={{ marginBottom: "30px" }}>
          <button
            className="add-student-btn"
            onClick={() => {
              const name = prompt("Enter student name:");
              const email = prompt("Enter student email:");
              const password = prompt("Enter student password:");
              const sports = prompt("Enter sports participation:");

              if (!name || !email || !password) return;

              const newStudent = {
                name,
                email,
                password,
                role: "student",
                math: 0,
                physics: 0,
                biology: 0,
                grade: "",
                remarks: "",
                sports: sports || ""
              };

              setStudents([...students, newStudent]);

              const users =
                JSON.parse(localStorage.getItem("users")) || [];
              localStorage.setItem(
                "users",
                JSON.stringify([...users, newStudent])
              );
            }}
          >
            + Add Student
          </button>
        </div>

        {/* Student Cards */}
        {students.map((student, index) => (
          <div key={index} className="dashboard-card">

            <div className="student-header">
              <h2 className="section-title">
                {student.name}
              </h2>
              <span className="grade-badge">
                Grade: {student.grade || "Not Assigned"}
              </span>
            </div>

            <button
              className="remove-student-btn"
              onClick={() => {
                const updated = [...students];
                updated.splice(index, 1);
                setStudents(updated);
              }}
            >
              Remove Student
            </button>

            <div className="marks-grid">
              <div>
                <label>Math</label>
                <input
                  type="number"
                  value={student.math}
                  onChange={(e) =>
                    handleChange(index, "math", e.target.value)
                  }
                />
              </div>
              <div>
                <label>Physics</label>
                <input
                  type="number"
                  value={student.physics}
                  onChange={(e) =>
                    handleChange(index, "physics", e.target.value)
                  }
                />
              </div>
              <div>
                <label>Biology</label>
                <input
                  type="number"
                  value={student.biology}
                  onChange={(e) =>
                    handleChange(index, "biology", e.target.value)
                  }
                />
              </div>
            </div>

            {/* Sports Section */}
            <div className="remarks-section">
              <label>Sports Participation</label>
              <input
                type="text"
                value={student.sports || ""}
                onChange={(e) => {
                  const updated = [...students];
                  updated[index].sports = e.target.value;
                  setStudents(updated);
                }}
              />
            </div>

            <div className="remarks-section">
              <label>Remarks</label>
              <textarea
                value={student.remarks}
                onChange={(e) => {
                  const updated = [...students];
                  updated[index].remarks = e.target.value;
                  setStudents(updated);
                }}
                rows="4"
              />
            </div>

          </div>
        ))}

        {/* Chart */}
        {marksAssigned && (
          <div className="dashboard-card">
            <h2 className="section-title">
              Class Performance Chart
            </h2>
            <div style={{ width: "100%", height: 400 }}>
              <ResponsiveContainer>
                <BarChart data={chartData}>
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="average"
                    fill="#6366f1"
                    radius={[12, 12, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default TeacherDashboard;