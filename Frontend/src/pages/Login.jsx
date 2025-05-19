import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  // Add with errorMessage
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })
  
      const contentType = response.headers.get("content-type");
      let data = {};
  
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      }
  
      setSuccessMessage("Login successful!");
      setTimeout(() => {
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        navigate("/dashboard");
      }, 1000);
      
    } catch (err) {
      setErrorMessage(err.message || "Login failed.");
    }
  };
  
  return (
    <div className="contain">
      <h2>Login</h2>
      
      <form onSubmit={handleSubmit} className="labels">
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
        <button type="submit" className="btn">Login</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
}
