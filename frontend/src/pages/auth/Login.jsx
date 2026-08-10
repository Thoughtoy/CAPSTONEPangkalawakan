import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css";
import { GraduationCap, Building2, ShieldCheck } from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("graduate");

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

      // Redirect depending on actual account role
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

      {/* LEFT SIDE */}
      {/* LEFT SIDE */}
<div className="login-hero">

  <div className="login-brand">
    <div className="login-brand-icon">
      <GraduationCap size={23} strokeWidth={2} />
    </div>

    <span>SkillBridge</span>
  </div>

  <div className="login-hero-content">
    <h1>
      Your skills already qualify
      <br />
      you for something.
    </h1>

    <p>
      Sign in to see internships scored against the
      skills on your profile — and the exact gaps
      standing between you and the rest.
    </p>
  </div>

</div>


      {/* RIGHT SIDE */}
      <div className="login-content">

        <div className="login-form-wrapper">

          <h1 className="login-title">
            Welcome back
          </h1>

          <p className="login-description">
            Choose your role and sign in to your dashboard.
          </p>


         {/* ROLE SELECTOR */}
<div className="login-role-selector">

  <button
    type="button"
    className={`login-role ${
      role === "graduate" ? "active" : ""
    }`}
    onClick={() => setRole("graduate")}
  >
    <GraduationCap
      className="role-icon"
      size={23}
      strokeWidth={2}
    />
    <span>Graduate</span>
  </button>

  <button
    type="button"
    className={`login-role ${
      role === "company" ? "active" : ""
    }`}
    onClick={() => setRole("company")}
  >
    <Building2
      className="role-icon"
      size={23}
      strokeWidth={2}
    />
    <span>Company</span>
  </button>

  <button
    type="button"
    className={`login-role ${
      role === "admin" ? "active" : ""
    }`}
    onClick={() => setRole("admin")}
  >
    <ShieldCheck
      className="role-icon"
      size={23}
      strokeWidth={2}
    />
    <span>PESO Admin</span>
  </button>

</div>


          {/* LOGIN CARD */}
          <div className="login-card">

            {error && (
              <div className="login-error">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin}>

              <div className="login-field">

                <label>
                  Email address
                </label>

                <input
                  className="login-input"
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="you@example.com"
                  required
                />

              </div>


              <div className="login-field">

                <label>
                  Password
                </label>

                <input
                  className="login-input"
                  type="password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="••••••••"
                  required
                />

              </div>


              <button
                type="submit"
                className="login-button"
                disabled={loading}
              >
                {loading
                  ? "Signing in..."
                  : "Sign in"}
              </button>

            </form>

            <p className="login-demo">
              Demo account pre-filled. Any password works.
            </p>

          </div>


          {/* REGISTER */}
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

    </div>
  );
}

export default Login;