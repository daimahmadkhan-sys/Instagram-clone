import React from "react";
import { Link } from "react-router";

const Register = () => {
  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form>
          <input type="text" name="username" placeholder="Enter username" />
          <input type="text" name="email" placeholder="Enter email" />
          <input type="text" name="password" placeholder="Enter password" />
          <button type="submit">Register</button>
        </form>

        <p>
          Already have an account?
          <Link className="toggleAuthForm" to="/login">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
