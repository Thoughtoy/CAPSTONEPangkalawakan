import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/GraduateRegister.css";

function GraduateRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            ...form,
            role: "graduate",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Graduate registration failed."
        );
      }

      // Login automatically after registration
      const loginResponse = await fetch(
        "http://127.0.0.1:8000/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
          }),
        }
      );

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        navigate("/login");
        return;
      }

      localStorage.setItem("token", loginData.token);
      localStorage.setItem(
        "user",
        JSON.stringify(loginData.user)
      );

      navigate("/graduate/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginTop: "6px",
    marginBottom: "15px",
    boxSizing: "border-box",
  };

  return (
  <div className="graduate-register-page">
    <div className="graduate-register-container">

      <button
        type="button"
        className="graduate-back-button"
        onClick={() => navigate("/register")}
      >
        ← Back
      </button>

      <h1 className="graduate-title">
        Graduate Registration
      </h1>

      <p className="graduate-description">
        Create your account first. You can complete your profile,
        skills, and resume after entering your dashboard.
      </p>

      {error && (
        <p className="graduate-error">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>

        <h2 className="graduate-section-title">
          Account Information
        </h2>

        <label>Full Name</label>
        <input
          className="graduate-input"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          className="graduate-input"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <input
          className="graduate-input"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <label>Confirm Password</label>
        <input
          className="graduate-input"
          type="password"
          name="password_confirmation"
          value={form.password_confirmation}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="graduate-submit-button"
          disabled={loading}
        >
          {loading
            ? "Creating Account..."
            : "Create Graduate Account"}
        </button>

      </form>
    </div>
  </div>
);
}

export default GraduateRegister;