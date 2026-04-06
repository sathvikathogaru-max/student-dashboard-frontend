import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
  ResponsiveContainer
} from "recharts";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";

function StudentDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const students = JSON.parse(localStorage.getItem("students")) || [];

  const student = students.find(
    (s) => s.email === user?.email
  );

  if (!student) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "100px" }}>
        No data found
      </h2>
    );
  }

  const average =
    (student.math + student.physics + student.biology) / 3;

  const rankedStudents = [...students].sort((a, b) => {
    const avgA = (a.math + a.physics + a.biology) / 3;
    const avgB = (b.math + b.physics + b.biology) / 3;
    return avgB - avgA;
  });

  const rank =
    rankedStudents.findIndex((s) => s.email === student.email) + 1;

  const chartData = [
    { subject: "Math", marks: student.math },
    { subject: "Physics", marks: student.physics },
    { subject: "Biology", marks: student.biology }
  ];

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  const downloadReport = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Student Academic Report", 20, 20);

    doc.setFontSize(14);
    doc.text(`Name: ${student.name}`, 20, 40);
    doc.text(`Email: ${student.email}`, 20, 50);

    doc.text(`Math: ${student.math}`, 20, 65);
    doc.text(`Physics: ${student.physics}`, 20, 75);
    doc.text(`Biology: ${student.biology}`, 20, 85);

    doc.text(`Average: ${average.toFixed(2)}`, 20, 100);
    doc.text(`Rank in Class: ${rank}`, 20, 110);
    doc.text(`Grade: ${student.grade || "Not Assigned"}`, 20, 120);

    doc.text(
      `Remarks: ${student.remarks || "No remarks provided"}`,
      20,
      135,
      { maxWidth: 170 }
    );

    // ✅ Extra Curricular Section in PDF
    doc.text("Extra-Curricular Activities:", 20, 155);
    doc.text(
      `Sports: ${student.sports || "Not Participated"}`,
      20,
      165
    );
    doc.text(
      `Cultural: ${student.cultural || "Not Participated"}`,
      20,
      175
    );
    doc.text(
      `Certifications: ${student.certifications || "None"}`,
      20,
      185
    );

    doc.save(`${student.name}_report.pdf`);
  };

  return (
    <div className="dashboard fade">
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>

      <h1 style={{ marginBottom: "40px" }}>
        Welcome {student.name}
      </h1>

      <div className="marks">

        <div className="card">
          <h2>Math: {student.math}</h2>
        </div>

        <div className="card">
          <h2>Physics: {student.physics}</h2>
        </div>

        <div className="card">
          <h2>Biology: {student.biology}</h2>
        </div>

        <div className="card highlight">
          <h2>Average: {average.toFixed(2)}</h2>
        </div>

        <div className="card">
          <h2>Rank in Class: {rank}</h2>
        </div>

        <div className="card">
          <h2>Grade: {student.grade || "Not Assigned"}</h2>
        </div>

        <div className="card">
          <h2>
            Remarks: {student.remarks || "No remarks provided"}
          </h2>
        </div>

      </div>

      {/* ✅ Extra-Curricular Section */}
      <div style={{ marginTop: "60px" }}>
        <h2>Extra-Curricular Activities</h2>

        <div className="card">
          <h3>🏀 Sports</h3>
          <p>{student.sports || "Not Participated"}</p>
        </div>

        <div className="card">
          <h3>🎭 Cultural Events</h3>
          <p>{student.cultural || "Not Participated"}</p>
        </div>

        <div className="card">
          <h3>📜 Certifications</h3>
          <p>{student.certifications || "None"}</p>
        </div>
      </div>

      <h2 style={{ marginTop: "60px" }}>
        Performance Analytics
      </h2>

      <div style={{ width: "100%", height: 500 }}>
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <XAxis dataKey="subject" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="marks"
              fill="#4f8ef7"
              radius={[10, 10, 0, 0]}
            >
              <LabelList dataKey="marks" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ marginTop: "50px" }}>
        <button
          onClick={downloadReport}
          style={{
            padding: "12px 20px",
            fontSize: "16px",
            backgroundColor: "#4f8ef7",
            color: "white",
            border: "none",
            borderRadius: "8px"
          }}
        >
          Download Report
        </button>
      </div>
    </div>
  );
}

export default StudentDashboard;