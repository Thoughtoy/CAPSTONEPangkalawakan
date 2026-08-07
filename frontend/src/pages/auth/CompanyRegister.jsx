import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginTop: "6px",
    marginBottom: "15px",
    boxSizing: "border-box",
  };

  return (
    <div style={{ padding: "40px", maxWidth: "700px", margin: "auto" }}>
      <button onClick={() => navigate("/register")}>
        ← Back
      </button>

      <h1>Company Application</h1>

      <p>
        Complete your company information. Your application will
        be reviewed by PESO before internship posting is enabled.
      </p>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <h2>Account Information</h2>

        <label>Company Name</label>
        <input
          style={inputStyle}
          name="company_name"
          value={form.company_name}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          style={inputStyle}
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <input
          style={inputStyle}
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <label>Confirm Password</label>
        <input
          style={inputStyle}
          type="password"
          name="password_confirmation"
          value={form.password_confirmation}
          onChange={handleChange}
          required
        />

        <hr />

        <h2>Company Information</h2>

        <label>Business Type</label>
        <input
          style={inputStyle}
          name="business_type"
          value={form.business_type}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          style={inputStyle}
          name="description"
          rows="4"
          value={form.description}
          onChange={handleChange}
          required
        />

        <label>Address</label>
        <textarea
          style={inputStyle}
          name="address"
          rows="3"
          value={form.address}
          onChange={handleChange}
          required
        />

        <label>Contact Person</label>
        <input
          style={inputStyle}
          name="contact_person"
          value={form.contact_person}
          onChange={handleChange}
          required
        />

        <label>Contact Number</label>
        <input
          style={inputStyle}
          name="contact_number"
          value={form.contact_number}
          onChange={handleChange}
          required
        />

        <label>Website (Optional)</label>
        <input
          style={inputStyle}
          name="website"
          value={form.website}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Company Application"}
        </button>
      </form>
    </div>
  );
}

export default CompanyRegister;