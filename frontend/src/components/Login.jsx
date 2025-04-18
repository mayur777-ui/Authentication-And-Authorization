import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../utility/login.css'; // Import your CSS file
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';

export default function Login() {
  const USER_API_END_POINT = "http://localhost:8000/api/user";
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: ""
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    role: '',
    google: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formIsValid = true;
    let errors = { email: '', password: '', role: '' };

    // Validation
    if (!input.email) {
      formIsValid = false;
      errors.email = 'Email is required';
    }
    if (!input.password) {
      formIsValid = false;
      errors.password = 'Password is required';
    }
    if (!input.role) {
      formIsValid = false;
      errors.role = 'Role is required';
    }

    if (!formIsValid) {
      setErrors(errors);
      setSubmitted(true);
      return;
    }

    try {
      const response = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        setInput({ email: "", password: "", role: "" });
        setErrors({});
        navigate('/dashboard');
      }
    } catch (err) {
      console.error("Error occurred:", err.response ? err.response.data : err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleGoogleLogin = async (response) => {
    try {
      const googleToken = response.credential;
      const res = await axios.post(`${USER_API_END_POINT}/googleLogin`, {
        token: googleToken,
      });
      const { token } = res.data;
      localStorage.setItem('token', token);
      navigate('/dashboard');
    } catch (error) {
      console.error("Google login error:", error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        google: 'Google login failed. Please try again.',
      }));
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-control login-input ${submitted && errors.email ? 'is-invalid' : ''}`}
              value={input.email}  
              onChange={handleChange}
            />
            <div className="invalid-feedback">{errors.email}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className={`form-control login-input ${submitted && errors.password ? 'is-invalid' : ''}`}
              value={input.password}  
              onChange={handleChange}
            />
            <div className="invalid-feedback">{errors.password}</div>
          </div>
          <div className="mb-3">
            <label className="form-label">Role:</label>
            <div className="form-check">
              <input
                type="radio"
                id="role-user"
                name="role"
                value="user"
                checked={input.role === 'user'}
                onChange={handleChange}
                className="form-check-input"
              />
              <label htmlFor="role-user" className="form-check-label">User</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                id="role-admin"
                name="role"
                value="admin"
                checked={input.role === 'admin'}
                onChange={handleChange}
                className="form-check-input"
              />
              <label htmlFor="role-admin" className="form-check-label">Admin</label>
            </div>
            <div className="invalid-feedback">{errors.role}</div>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Link to="/forgot-password" className="text-muted">Forgot Password?</Link>
          </div>
          <div className="text-center">
            <button type="submit" className="login-btn">Login</button>
          </div>
        </form>

        {errors.google && <div className="error-message">{errors.google}</div>}
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={(error) => setErrors({ google: 'Google login failed. Please try again.' })}
        />
      </div>
    </div>
  );
}
