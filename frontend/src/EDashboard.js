import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EDashboard.css";

function EDashboard() {
  const [user, setUser] = useState(null);
  const [githubInput, setGithubInput] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");
  // console.log(localStorage.getItem("token"));

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5001/api/employee/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(res.data);
        setGithubInput(res.data.githubUsername || "");
      } catch (error) {
        console.error(
          "Error fetching profile:",
          error.response ? error.response.data : error.message
        );
        setMessage(
          "Failed to load profile: " +
            (error.response?.data?.msg || error.message)
        );
      }
    };
    fetchProfile();
  }, [token]);

  const handleGithub = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5001/api/employee/github",
        { githubUsername: githubInput },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage(res.data.msg);
      setUser(res.data.user);
    } catch (error) {
      setMessage("Error updating GitHub username");
    }
  };

  const resumeHandler = async (e) => {
    e.preventDefault();

    if (!resumeFile) {
      setMessage("Please select a file to upload.");
      return;
    }

    setMessage("");

    const formData = new FormData();
    formData.append("resume", resumeFile);

    try {
      const res = await axios.post(
        "http://localhost:5001/api/employee/resume",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(res.data.msg);
      setUser(res.data.user);
      setResumeFile(null);
    } catch (err) {
      setMessage("Error uploading resume");
    }
  };

  if (!user)
    return (
      <div className="dashboard">
        <p>Loading profile...</p>
      </div>
    );

  return (
    <div className="dashboard-wrapper">
      <div className="card left-card">
        <h2>Welcome, {user.name}!</h2>
        <p style={{color:'yellow'}}>Role: {user.role}</p>

        <form onSubmit={handleGithub}>
          <input
            type="text"
            placeholder="GitHub Username"
            value={githubInput}
            onChange={(e) => setGithubInput(e.target.value)}
          />
          <button type="submit">Update GitHub</button>
        </form>

        <h3 style={{color:'yellow'}}>Resume:</h3>
        {user.resume && user.resume.fileUrl ? (
          <p>
            <a
              href={`http://localhost:5001${user.resume.fileUrl}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View/Download
            </a>
          </p>
        ) : (
          <p>No Resume Uploaded</p>
        )}

        <form onSubmit={resumeHandler}>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setResumeFile(e.target.files[0])}
            style={{color:'yellow'}}
          />
          <button type="submit">Submit</button>
        </form>

        {message && (
          <p
            className={message.includes("Error") ? "error-message" : "message"}
          >
            {message}
          </p>
        )}
      </div>

      <div className="card right-card">
        <h2>Parsed Skills</h2>
        <ul>
          {user.parsedSkills && user.parsedSkills.length > 0 ? (
            user.parsedSkills.map((skill, index) => (
              <li key={index}>
                {skill.name} – <strong>{skill.confidence}%</strong>
              </li>
            ))
          ) : (
            <p>No Skills Detected.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default EDashboard;
