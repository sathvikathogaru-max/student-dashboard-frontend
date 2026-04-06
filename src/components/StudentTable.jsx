import { useState, useEffect } from "react";

function getGrade(avg) {
  if (avg >= 90) return "A";
  if (avg >= 75) return "B";
  if (avg >= 60) return "C";
  return "D";
}

function StudentTable({ isTeacher, studentName }) {

  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("students");
    return saved
      ? JSON.parse(saved)
      : [
          { name: "Suri", math: 92, physics: 88, biology: 76 },
          { name: "Ram", math: 85, physics: 90, biology: 80 }
        ];
  });

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const handleChange = (index, subject, value) => {
    const updated = [...students];
    updated[index][subject] = Number(value);
    setStudents(updated);
  };

  const visibleStudents = isTeacher
    ? students
    : students.filter((s) => s.name === studentName);

  return (
    <div className="card">
      <h3>Student List</h3>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Math</th>
            <th>Physics</th>
            <th>Biology</th>
            <th>Average</th>
            <th>Grade</th>
          </tr>
        </thead>

        <tbody>
          {visibleStudents.map((s, index) => {
            const avg = (s.math + s.physics + s.biology) / 3;
            return (
              <tr key={index}>
                <td>{s.name}</td>

                {isTeacher ? (
                  <>
                    <td>
                      <input
                        type="number"
                        value={s.math}
                        onChange={(e) =>
                          handleChange(index, "math", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={s.physics}
                        onChange={(e) =>
                          handleChange(index, "physics", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={s.biology}
                        onChange={(e) =>
                          handleChange(index, "biology", e.target.value)
                        }
                      />
                    </td>
                  </>
                ) : (
                  <>
                    <td>{s.math}</td>
                    <td>{s.physics}</td>
                    <td>{s.biology}</td>
                  </>
                )}

                <td>{avg.toFixed(2)}</td>
                <td>{getGrade(avg)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;