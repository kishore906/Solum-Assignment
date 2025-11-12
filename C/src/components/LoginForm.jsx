import { useState } from "react";
import users from "../utils/users";

// Regex for password validation
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`]).{8,16}$/;

const LoginForm = ({ onLoginSuccess }) => {
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  // Handle form values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => {
      return { ...prev, [name]: value };
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // prevents page refresh
    setError(""); // clear previous error

    // Email Validation: checking email is empty
    if (!formValues.email) {
      setError("Email is required");
      return;
    }

    // Validation: checking email exists or not in users
    const user = users.find((user) => user.email === formValues.email);
    if (!user) {
      setError("Email does not exist");
      return;
    }

    // Validation: Password criteria
    if (!passwordRegex.test(formValues.password)) {
      setError(
        "Password must be 8-16 chars, with one uppercase, one lowercase, one number and one symbol"
      );
      return;
    }

    // Validation: checking password is correct or not for provided email
    if (user.password !== formValues.password) {
      setError("Invalid Password");
      return;
    }

    // If credentials are correct we set login to true
    onLoginSuccess(user.email);

    // empty form fields
    setFormValues({ email: "", password: "" });
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <img src="user.png" className="avatar" />

      <h2>Login</h2>

      <div className="input-div one">
        <div className="icon">
          <i className="fa fa-user"></i>
        </div>
        <div>
          <h5>Email</h5>
          <input
            type="email"
            name="email"
            className="input"
            value={formValues.email}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="input-div two">
        <div className="icon">
          <i className="fa fa-lock"></i>
        </div>
        <div>
          <h5>Password</h5>
          <input
            type="password"
            name="password"
            className="input"
            value={formValues.password}
            onChange={handleChange}
          />
        </div>
      </div>
      {error && <p className="error">{error}</p>}

      <a href="#" className="forgot-password-link">
        Forgot Password?
      </a>
      <button type="submit" className="btn login">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
