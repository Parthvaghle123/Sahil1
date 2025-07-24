import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RedirectLoader from "./RedirectLoader"; // Import Loader component
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = ({ setUsername }) => {
  const [usernameInput, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");
  const [strengthMessage, setStrengthMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // For loader
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (value.length < 4) {
      setStrengthMessage("Weak password ❌");
    } else if (/[A-Z]/.test(value) && /\d/.test(value) && value.length >= 8) {
      setStrengthMessage("Strong password ✅");
    } else {
      setStrengthMessage("Moderate password ⚠️");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Show loading
    axios
      .post("http://localhost:3001/login", {
        username: usernameInput,
        password,
      })
      .then((res) => {
        if (res.data.message === "Success") {
          localStorage.setItem("token", res.data.token);
          setUsername(res.data.username);
          // Wait for loader to finish, then navigate (inside RedirectLoader)
        } else {
          setErrorMessage(res.data.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("Server error. Try again later.");
        setLoading(false);
      });
  };

  // If loading, show loader with 5s timer, then navigate to home
  if (loading) {
    return (
      <RedirectLoader
        seconds={3}
        onComplete={() => navigate("/")}
      />
    );
  }

  return (
    <div className="body">
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="login-container">
          <h2 className="text-primary text-center mb-3 head">Login</h2>
          <hr />
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter username"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="*********"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <small className="text-muted strength">{strengthMessage}</small>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>

          <p className="mt-3 text-center">
            Don't have an account?{" "}
            <a href="/register" className="text-decoration-none">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
