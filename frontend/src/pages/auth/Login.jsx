import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message ||
          data.errors?.email?.[0] ||
          "Login failed."
        );

        setLoading(false);
        return;
      }

      // Save login information
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      // Redirect depending on role
      if (data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (data.user.role === "company") {
        navigate("/company/dashboard");
      } else if (data.user.role === "graduate") {
        navigate("/graduate/dashboard");
      }

    } catch (error) {
      setError(
        "Unable to connect to the SkillBridge server."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="login-page">
    <div className="login-container">

      <h1 className="login-brand">
        SkillBridge
      </h1>

      <h2 className="login-title">
        Login
      </h2>

      <p className="login-description">
        Sign in to continue to your account.
      </p>

      {error && (
        <div className="login-error">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin}>

        <div className="login-field">
          <label>Email</label>

          <input
            className="login-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="login-field">
          <label>Password</label>

          <input
            className="login-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="login-button"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>

      <p className="login-register">
        Don't have an account?
        <span
          className="login-register-link"
          onClick={() => navigate("/register")}
        >
          Register here
        </span>
      </p>

    </div>
  </div>
);
}

export default Login;