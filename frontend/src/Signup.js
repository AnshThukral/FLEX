import React, { useState } from "react";
import axios from "axios";
import './Signup.css';
import {useNavigate} from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
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
        "http://localhost:5001/api/auth/signup",
        formData
      );

      setTimeout(()=>{
        navigate("/login");
      },1500);

      setMessage(res.data.msg);
    } catch (err) {
      console.log(err.response.data); // 👈 Add this
      setMessage(err.response?.data?.msg || "Something went wrong");
    }
  };
  return (
    <div className="form-wrapper">
      <h1>Signup Form</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          onChange={changeHandler}
          required
        />
        <br />
        <br />
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
        <label htmlFor="role">Role:</label>
        <div className="radio-group">
          <div className="radio-option">
            <input
              type="radio"
              name="role"
              value="employee"
              onChange={changeHandler}
            />
            <label>Employee</label>
          </div>

          <div className="radio-option">
            <input
              type="radio"
              name="role"
              onChange={changeHandler}
              value="recruiter"
            />
            <label>Recruiter</label>
          </div>
        </div>

        <button type="submit">Submit</button>
      </form>
      <p>Already a User! <a href="/login">Login</a></p>
      <p
        className="form-message"
        style={{ color: message.includes("success") ? "green" : "red" }}
      >
        {message}
      </p>
    </div>
  );
}

export default Signup;
