import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

function ChartComponent({ studentName }) {

  const students = JSON.parse(localStorage.getItem("students"));
  const student = students.find((s) => s.name === studentName);

  const data = [
    { subject: "Math", marks: student.math },
    { subject: "Physics", marks: student.physics },
    { subject: "Biology", marks: student.biology }
  ];

  return (
    <div className="card">
      <h3>Subject Mastery</h3>

      <BarChart width={600} height={300} data={data}>
        <XAxis dataKey="subject" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="marks" fill="#4f46e5" />
      </BarChart>
    </div>
  );
}

export default ChartComponent;