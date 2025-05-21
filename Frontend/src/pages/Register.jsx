import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Baseurl = import.meta.env.VITE_BASE_URL || "http://localhost:3000"

export default function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  // Add with errorMessage
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorMessage(""); // Clear message on input
  };
  const isPasswordStrong = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!isPasswordStrong(form.password)) {
      setErrorMessage("Password must be at least 8 characters and include uppercase, lowercase, digit, and special character.");
      return;
    }
  
    try {
      const response = await fetch(`${Baseurl}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Registration failed.");
      }
  
      setSuccessMessage("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/users/login"), 1500);
  
    } catch (err) {
      setErrorMessage(err.message || "Registration failed.");
    }
  };
  

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}className="labels">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn">Register</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
}
