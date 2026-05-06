import { useState } from "react";

export default function AdminPage() {
  const [data, setData] = useState(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const fetchResults = async () => {
    try {
      const res = await fetch("https://commit-survey-app.onrender.com/admin/results", {
        headers: {
          "X-Admin-Password": 2811,
        },
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      const json = await res.json();
      setData(json);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch results");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      {!data && (
        <>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={fetchResults}>Load Results</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </>
      )}

      {data && (
        <div>
          <h2>Total Responses: {data.total_responses}</h2>

          {data.questions.map((q) => (
            <div key={q.question_number} style={{ marginBottom: "20px" }}>
              <h3>
                Q{q.question_number}: {q.question_text}
              </h3>

              {Object.entries(q.options).map(([key, val]) => (
                <div key={key}>
                  <strong>{key}</strong> - {val.label} : {val.count} ({val.percentage}%)
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
