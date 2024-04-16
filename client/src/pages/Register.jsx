import React, { useState } from "react";
import { Link } from "react-router-dom";
const Register = () => {
  const [userData, setUserData] = useState({
    firstname: "",
    email: "",
    password: "",
    password2: "",
  });
  const changeInputHandler = (e) => {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  return (
    <section className="register">
      <div className="container">
        <h2>Sign Up</h2>
        <form className="form register__form">
          <p className="form__error-message">This is an error message</p>

          <input
            type="text"
            name="firstname"
            value={userData.firstname}
            placeholder="firstname"
            onChange={changeInputHandler}
            autoFocus
          />
          <input
            type="email"
            name="email"
            value={userData.email}
            placeholder="email"
            onChange={changeInputHandler}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={userData.password}
            onChange={changeInputHandler}
          />
          <input
            type="password"
            placeholder=" confirm password"
            name="password2"
            value={userData.password2}
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
