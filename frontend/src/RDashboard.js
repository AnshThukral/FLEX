import axios from "axios";
import React, { useEffect, useState } from "react";
import "./RDashboard.css";

function RDashboard() {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [project, setProject] = useState("");
  const [users, setUsers] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/employee/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (error) {
        console.log("Error : " + error);
        setMessage(
          "Error Fetching Profile: " + (error.response?.data?.msg || error.message)
        );
      }
    };
    fetchProfile();
  }, [token]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5001/api/recruiter/matchProfiles",
        { project },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsers(res.data);
    } catch (error) {
      console.log("Error : " + error);
      setMessage(
        "Error Fetching Profiles: " + (error.response?.data?.msg || error.message)
      );
    }
  };

  if (!user) {
    return (
      <div className="dashboard-wrapper">
        <div className="card left-card">
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-wrapper">
      <div className="card left-card">
        <h2>Welcome, {user.name}!</h2>
        <p style={{ color: "yellow" }}>Role: {user.role}</p>

        <form onSubmit={submitHandler}>
          <label htmlFor="project">Project: </label>
          <input
            type="text"
            name="project"
            value={project}
            placeholder="Enter Project Details"
            onChange={(e) => setProject(e.target.value)}
          />
          <br />
          <button type="submit">Find Talent</button>
        </form>

        {message && <p className="error-message">{message}</p>}
      </div>

      {users.length > 0 && (
        <div className="card right-card">
          <h3>Matched Users (Sorted by Relevance):</h3>
          <ul>
            {users
              .map((u) => {
                const projectText = project.toLowerCase();

                const matchingSkills =
                  u.parsedSkills?.filter((s) =>
                    projectText.includes(s.name.toLowerCase())
                  ) || [];

                const totalConfidence = matchingSkills.reduce(
                  (sum, s) => sum + s.confidence,
                  0
                );
                const avgConfidence =
                  matchingSkills.length > 0
                    ? totalConfidence / matchingSkills.length
                    : null;

                return { user: u, avgConfidence };
              })
              .filter((entry) => entry.avgConfidence !== null)
              .sort((a, b) => b.avgConfidence - a.avgConfidence)
              .map((entry) => (
                <li key={entry.user._id}>
                  {entry.user.name} – Avg Relevant Skill Confidence:{" "}
                  {entry.avgConfidence.toFixed(1)}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default RDashboard;
