import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const changeInputHandler = (e) => {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Validate user input
      if (!userData.name || !userData.email || !userData.password || !userData.confirmPassword) {
        setError("Please fill in all fields");
        throw new Error('Please fill in all fields');
      }
      // Check if passwords match
      if (userData.password !== userData.confirmPassword) {
        setError("Passwords do not match");
        throw new Error("Passwords do not match");
      }
      // Create a new user
      const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/users/register`, userData);
      navigate("/login")
    } catch (error) {
      setError(error.response.data.message)
    }
  }


  return (
    <section className="register">
      <div className="container">
        <h2>Sign Up</h2>
        <form className="form register__form" onSubmit={handleRegister}>
          {error ? <p className="form__error-message">{error}</p> : null}

          <input
            type="text"
            name="name"
            value={userData.name}
            placeholder="Name"
            onChange={changeInputHandler}
            autoFocus
          />
          <input
            type="email"
            name="email"
            value={userData.email}
            placeholder="Email"
            onChange={changeInputHandler}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={changeInputHandler}
          />
          <input
            type="password"
            placeholder=" Confirm Password"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={changeInputHandler}
          />
          <button type="submit" className="btn primary">
            Register
          </button>
        </form>
        <small>
          Already have an account ? <Link to="/login">Sign In</Link>
        </small>
      </div>
    </section>
  );
};

export default Register;
