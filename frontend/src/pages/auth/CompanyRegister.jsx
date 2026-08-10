import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/CompanyRegister.css";

function CompanyRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    company_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    business_type: "",
    description: "",
    address: "",
    contact_person: "",
    contact_number: "",
    website: "",
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
      // STEP 1: Create company USER account
      const registerResponse = await fetch(
        "http://127.0.0.1:8000/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: form.company_name,
            email: form.email,
            password: form.password,
            password_confirmation: form.password_confirmation,
            role: "company",
          }),
        }
      );

      const registerData = await registerResponse.json();

      if (!registerResponse.ok) {
        throw new Error(
          registerData.message ||
            "Unable to create company account."
        );
      }

      // STEP 2: Create company PROFILE/APPLICATION
      const companyResponse = await fetch(
        "http://127.0.0.1:8000/api/companies",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            user_id: registerData.user.id,
            company_name: form.company_name,
            business_type: form.business_type,
            description: form.description,
            address: form.address,
            contact_person: form.contact_person,
            contact_number: form.contact_number,
            email: form.email,
            website: form.website || null,
          }),
        }
      );

      const companyData = await companyResponse.json();

      if (!companyResponse.ok) {
        throw new Error(
          companyData.message ||
            "Unable to create company application."
        );
      }

      // STEP 3: Automatically login
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

      navigate("/company/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="company-register-page">

      {/* HEADER */}
      <header className="company-header">

        <div className="company-logo">
          <div className="company-logo-icon">
            🎓
          </div>

          <span>SkillBridge</span>
        </div>

        <button
          type="button"
          className="company-login-link"
          onClick={() => navigate("/login")}
        >
          Login
        </button>

      </header>

      {/* MAIN */}
      <main className="company-register-main">

        <div className="company-register-content">

          <h1 className="company-title">
            Create your account
          </h1>

          <p className="company-description">
            Graduates get matched instantly. Companies are reviewed
            by a PESO administrator before posting.
          </p>

          {/* ACCOUNT TYPE */}
          <div className="company-type-switch">

            <button
              type="button"
              className="company-type"
              onClick={() => navigate("/register/graduate")}
            >
              🎓 Graduate
            </button>

            <button
              type="button"
              className="company-type active"
            >
              🏢 Company
            </button>

          </div>

          {/* FORM CARD */}
          <div className="company-register-container">

            {error && (
              <div className="company-error">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              {/* COMPANY INFORMATION */}

              <div className="company-form-group">
                <label>Company name</label>

                <input
                  className="company-input"
                  type="text"
                  name="company_name"
                  placeholder="Pixel Forge Studio"
                  value={form.company_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="company-form-group">
                <label>Email address</label>

                <input
                  className="company-input"
                  type="email"
                  name="email"
                  placeholder="company@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="company-form-group">
                <label>Business type</label>

                <input
                  className="company-input"
                  type="text"
                  name="business_type"
                  placeholder="Information Technology"
                  value={form.business_type}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="company-form-group">
                <label>Description</label>

                <textarea
                  className="company-input company-textarea"
                  name="description"
                  placeholder="Tell us about your company"
                  rows="4"
                  value={form.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="company-form-group">
                <label>Address</label>

                <textarea
                  className="company-input company-textarea"
                  name="address"
                  placeholder="Company address"
                  rows="3"
                  value={form.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="company-form-group">
                <label>Contact person</label>

                <input
                  className="company-input"
                  type="text"
                  name="contact_person"
                  placeholder="Juan Dela Cruz"
                  value={form.contact_person}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="company-form-group">
                <label>Contact number</label>

                <input
                  className="company-input"
                  type="text"
                  name="contact_number"
                  placeholder="09123456789"
                  value={form.contact_number}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="company-form-group">
                <label>Website <span>(Optional)</span></label>

                <input
                  className="company-input"
                  type="text"
                  name="website"
                  placeholder="https://example.com"
                  value={form.website}
                  onChange={handleChange}
                />
              </div>

              {/* PASSWORD */}

              <div className="company-form-group">
                <label>Password</label>

                <input
                  className="company-input"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="company-form-group">
                <label>Confirm password</label>

                <input
                  className="company-input"
                  type="password"
                  name="password_confirmation"
                  value={form.password_confirmation}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="company-submit-button"
                disabled={loading}
              >
                {loading
                  ? "Submitting..."
                  : "Submit company application"}
              </button>

            </form>

          </div>

          {/* SIGN IN */}

          <p className="company-signin">
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

export default CompanyRegister;