import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Baseurl = import.meta.env.VITE_BASE_URL
console.log(import.meta.env.VITE_BASE_URL);

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${Baseurl}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Optional: store token in localStorage or context
      localStorage.setItem("token", data.token);
      setSuccessMessage("Login successful!");

      // Optional: store user info if needed
      localStorage.setItem("user", JSON.stringify(data.user));

      setTimeout(() => navigate("/dashboard"), 1500); // or wherever you want to redirect
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="container">
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
