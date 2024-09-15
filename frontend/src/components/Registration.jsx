import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../utility/Register.css';

export default function Registration() {
  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const USER_API_END_POINT = "http://localhost:8000/api/user";

  const validate = () => {
    const errors = {};
    if (!input.name) errors.name = 'Please enter your name';
    if (!input.email) errors.email = 'Please enter your email';
    if (!input.password) errors.password = 'Please enter your password';
    else if (input.password.length < 6) errors.password = 'Password must be at least 6 characters long';
    if (!input.role) errors.role = 'Please select a role';
    return errors;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length === 0) {
      try {
        await axios.post(`${USER_API_END_POINT}/register`, input, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        navigate('/login');
      } catch (err) {
        console.error('Error occurred:', err);
        if (err.response && err.response.data) {
          setErrors({ form: err.response.data.message });
        }
      }
    } else {
      setErrors(validationErrors);
      setSubmitted(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="registration-page">
      {/* Background waves */}
      <div className="wave"></div>
      <div className="wave"></div>

      <div className="registration-card">
        <h3 className="text-center mb-4">Register</h3>
        {errors.form && <div className="alert alert-danger">{errors.form}</div>}
        <form onSubmit={submitHandler} noValidate>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={input.name}
              onChange={handleChange}
              className={`form-control registration-input ${submitted && errors.name ? 'is-invalid' : ''}`}
              placeholder="Enter your name"
            />
            <div className="invalid-feedback">{errors.name}</div>
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={input.email}
              onChange={handleChange}
              className={`form-control registration-input ${submitted && errors.email ? 'is-invalid' : ''}`}
              placeholder="Enter your email"
            />
            <div className="invalid-feedback">{errors.email}</div>
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={input.password}
              onChange={handleChange}
              className={`form-control registration-input ${submitted && errors.password ? 'is-invalid' : ''}`}
              placeholder="Enter your password"
            />
            <div className="invalid-feedback">{errors.password}</div>
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="mb-3">
            <label className="form-label" id="role-user-label">Role:</label>
            <div className="form-check">
              <input
                type="radio"
                id="role-user"
                name="role"
                value="user"
                checked={input.role === 'user'}
                onChange={handleChange}
                className={`form-check-input ${submitted && errors.role ? 'is-invalid' : ''}`}
              />
              <label htmlFor="role-user" className="form-check-label" id="role-user-label">User</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                id="role-admin"
                name="role"
                value="admin"
                checked={input.role === 'admin'}
                onChange={handleChange}
                className={`form-check-input ${submitted && errors.role ? 'is-invalid' : ''}`}
              />
              <label htmlFor="role-admin" className="form-check-label" id="role-admin-label">Admin</label>
            </div>
            <div className="invalid-feedback">{errors.role}</div>
          </div>
          <button type="submit" className="outline-btn registration-btn">Register</button>
        </form>
      </div>
    </div>
  );
}
