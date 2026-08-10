import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/GraduateRegister.css";

function GraduateRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    school: "",
    course: "",
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
            name: form.name,
            email: form.email,
            password: form.password,
            password_confirmation: form.password_confirmation,
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

      // Automatically login after registration
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

  return (
    <div className="graduate-register-page">

      {/* HEADER */}
      <header className="graduate-header">
        <div className="graduate-logo">
          <div className="graduate-logo-icon">🎓</div>
          <span>SkillBridge</span>
        </div>

        <button
          type="button"
          className="graduate-login-link"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </header>

      {/* MAIN CONTENT */}
      <main className="graduate-register-main">

        <div className="graduate-register-content">

          <h1 className="graduate-title">
            Create your account
          </h1>

          <p className="graduate-description">
            Graduates get matched instantly. Companies are reviewed
            by a PESO administrator before posting.
          </p>

          {/* ACCOUNT TYPE */}
          <div className="register-type-switch">

            <button
              type="button"
              className="register-type active"
            >
              🎓 Graduate
            </button>

            <button
              type="button"
              className="register-type"
              onClick={() => navigate("/register/company")}
            >
              🏢 Company
            </button>

          </div>

          {/* FORM CARD */}
          <div className="graduate-register-container">

            {error && (
              <div className="graduate-error">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              <div className="graduate-form-group">
                <label>Full name</label>

                <input
                  className="graduate-input"
                  type="text"
                  name="name"
                  placeholder="Juan Dela Cruz"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="graduate-form-group">
                <label>Email address</label>

                <input
                  className="graduate-input"
                  type="email"
                  name="email"
                  placeholder="juan@student.ph"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="graduate-form-group">
                <label>School</label>

                <input
                  className="graduate-input"
                  type="text"
                  name="school"
                  placeholder="University of San Carlos"
                  value={form.school}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="graduate-form-group">
                <label>Course</label>

                <input
                  className="graduate-input"
                  type="text"
                  name="course"
                  placeholder="BS Information Technology"
                  value={form.course}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="graduate-form-group">
                <label>Password</label>

                <input
                  className="graduate-input"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="graduate-form-group">
                <label>Confirm password</label>

                <input
                  className="graduate-input"
                  type="password"
                  name="password_confirmation"
                  value={form.password_confirmation}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="graduate-submit-button"
                disabled={loading}
              >
                {loading
                  ? "Creating account..."
                  : "Create graduate account"}
              </button>

            </form>
          </div>

          {/* SIGN IN */}
          <p className="graduate-signin">
            Already registered?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
            >
              Sign in
            </button>
          </p>

        </div>

      </main>
    </div>
  );
}

export default GraduateRegister;