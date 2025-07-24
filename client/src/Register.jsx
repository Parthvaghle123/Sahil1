import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Signup.css";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    country_code: "+91",
    gender: "",
    dob: "",
    address: "",
  });
  const [password, setPassword] = useState("");
  const [strengthMessage, setStrengthMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

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

    axios
  .post("http://localhost:3001/register", {
    ...form,
    password: password,
  })
  .then((res) => {
    if (res.data.success) {
      alert("Registration successful ✅");
      navigate("/login"); // 🔁 Register પછી Login પર
    }
  })

      .catch((err) => {
        console.error("Signup error:", err);
        setErrorMessage("An error occurred during signup.");
      });
  };

  return (
    <div className="body">
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="signup-container bg-white p-4 shadow">
          <h2 className="text-primary text-center mb-3 head">Sign-Up</h2>
          <hr />

          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                name="username"
                className="form-control"
                placeholder="Enter your name"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="example@gmail.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Phone</label>
              <div className="input-group">
                <select
                  name="country_code"
                  className="form-select"
                  value={form.country_code}
                  onChange={handleChange}
                >
                  <option value="+91">+91 (India)</option>
                  <option value="+1">+1 (USA)</option>
                  <option value="+44">+44 (UK)</option>
                  <option value="+61">+61 (Australia)</option>
                </select>
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  placeholder="1234567890"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Gender</label>
              <div className="d-flex gap-3 justify-content-between">
                {["male", "female", "other"].map((g) => (
                  <label key={g} style={{ flex: 1 }}>
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={form.gender === g}
                      onChange={handleChange}
                      className="d-none"
                    />
                    <div
                      className={`p-2 rounded text-center ${
                        form.gender === g ? "border border-primary bg-light" : "border"
                      }`}
                    >
                      <div
                        className="circle mx-auto mb-2"
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          border: "2px solid #555",
                        }}
                      ></div>
                      {g.charAt(0).toUpperCase() + g.slice(1)}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Date of Birth</label>
              <input
                type="date"
                name="dob"
                className="form-control"
                value={form.dob}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Address</label>
              <textarea
                name="address"
                className="form-control"
                placeholder="Enter your address"
                rows="2"
                value={form.address}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                placeholder="********"
                className="form-control"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <small className="text-muted">{strengthMessage}</small>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
          </form>

          <p className="text-center mt-3">
            Already registered? <a href="/login">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
