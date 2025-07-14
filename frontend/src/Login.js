import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    console.log(formData); // 👈 Add this
    try {
      const res = await axios.post(
        "http://localhost:5001/api/auth/login",
        formData
      );

      console.log(res);
      const role = res.data?.user?.role;
      const token = res.data?.token; // assuming your backend sends token as `token`

      if (token) {
        localStorage.setItem("token", token); // Save token for later use
      }

      if (role === "employee") {
        setTimeout(() => navigate("/empDashboard"), 1500);
      } else if (role === "recruiter") {
        setTimeout(() => navigate("/recDashboard"), 1500);
      } else {
        console.error("Unknown role:", role);
      }

      setMessage(res.data.msg);
    } catch (err) {
      console.log(err.response.data);
      setMessage(err.response?.data?.msg || "Something went wrong");
    }
  };
  return (
    <div className="form-wrapper">
      <h1>Login Form</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          onChange={changeHandler}
          required
        />
        <br />
        <br />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          onChange={changeHandler}
          required
        />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
      <p>Create your journey <a href="/">Signup</a></p>
      <p
        className="form-message"
        style={{ color: message?.includes("success") ? "green" : "red" }}
      >
        {message}
      </p>
    </div>
  );
}

export default Login;
