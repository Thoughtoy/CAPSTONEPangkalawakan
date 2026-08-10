import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  GraduationCap,
  LayoutDashboard,
  FilePlus2,
  BriefcaseBusiness,
  Users,
  Building2,
  LogOut,
} from "lucide-react";

import "../../styles/CompanyProfile.css";

function CompanyProfile() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    company_name: "",
    industry: "",
    permit_number: "",
    contact_email: "",
    office_address: "",
    about: "",
  });

  // =========================
  // FETCH COMPANY PROFILE
  // =========================

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://127.0.0.1:8000/api/company/profile",
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to load company profile."
          );
        }

        setForm({
          company_name: data.company_name || "",
          industry: data.industry || "",
          permit_number:
            data.permit_number ||
            data.business_permit_number ||
            "",
          contact_email:
            data.contact_email ||
            data.email ||
            "",
          office_address:
            data.office_address ||
            data.address ||
            "",
          about:
            data.about ||
            data.description ||
            "",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // SAVE
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/company/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to save company profile."
        );
      }

      setSuccess("Company profile updated successfully.");

      // update local user name if applicable
      const currentUser = JSON.parse(
        localStorage.getItem("user")
      );

      if (currentUser) {
        currentUser.name = form.company_name;
        localStorage.setItem(
          "user",
          JSON.stringify(currentUser)
        );
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // =========================
  // COMPANY INFO
  // =========================

  const companyName =
    form.company_name ||
    user?.name ||
    "ABC Software Solutions";

  const avatarLetter = companyName
    .charAt(0)
    .toUpperCase();

  // =========================
  // ACTIVE SIDEBAR
  // =========================

  const isActive = (path) => {
    return location.pathname === path;
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="company-profile-loading">
        Loading company profile...
      </div>
    );
  }

  return (
    <div className="company-profile-page">

      {/* ==================================================
          SIDEBAR
      ================================================== */}

      <aside className="company-sidebar">

        {/* BRAND */}

        <div className="sidebar-brand">

          <div className="sidebar-brand-icon">
            <GraduationCap size={24} />
          </div>

          <span>
            SkillBridge
          </span>

        </div>


        {/* NAVIGATION */}

        <nav className="sidebar-nav">

          {/* DASHBOARD */}

          <button
            type="button"
            className={`sidebar-item ${
              isActive("/company/dashboard")
                ? "active"
                : ""
            }`}
            onClick={() =>
              navigate("/company/dashboard")
            }
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </button>


          {/* CREATE INTERNSHIP */}

          <button
            type="button"
            className={`sidebar-item ${
              isActive(
                "/company/internships/create"
              )
                ? "active"
                : ""
            }`}
            onClick={() =>
              navigate(
                "/company/internships/create"
              )
            }
          >
            <FilePlus2 size={20} />
            <span>Create Internship</span>
          </button>


          {/* MY INTERNSHIPS */}

          <button
            type="button"
            className={`sidebar-item ${
              isActive("/company/internships")
                ? "active"
                : ""
            }`}
            onClick={() =>
              navigate("/company/internships")
            }
          >
            <BriefcaseBusiness size={20} />
            <span>My Internships</span>
          </button>


          {/* APPLICANTS */}

          <button
            type="button"
            className={`sidebar-item ${
              isActive("/company/applicants")
                ? "active"
                : ""
            }`}
            onClick={() =>
              navigate("/company/applicants")
            }
          >
            <Users size={20} />
            <span>Applicants</span>
          </button>


          {/* COMPANY PROFILE */}

          <button
            type="button"
            className={`sidebar-item ${
              isActive("/company/profile")
                ? "active"
                : ""
            }`}
            onClick={() =>
              navigate("/company/profile")
            }
          >
            <Building2 size={20} />
            <span>Company Profile</span>
          </button>

        </nav>


        {/* LOGOUT */}

        <button
          type="button"
          className="sidebar-logout"
          onClick={handleLogout}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>

      </aside>


      {/* ==================================================
          MAIN
      ================================================== */}

      <main className="company-profile-main">

        {/* HEADER */}

        <header className="company-profile-header">

          <div>
            <h1>
              Company Profile
            </h1>

            <p>
              Shown to graduates on every internship card
            </p>
          </div>

          <div className="company-profile-avatar">
            {avatarLetter}
          </div>

        </header>


        {/* CONTENT */}

        <div className="company-profile-content">

          {/* ERROR */}

          {error && (
            <div className="company-profile-alert error">
              {error}
            </div>
          )}


          {/* SUCCESS */}

          {success && (
            <div className="company-profile-alert success">
              {success}
            </div>
          )}


          <div className="company-profile-grid">

            {/* ==================================================
                FORM
            ================================================== */}

            <form
              className="company-profile-form-card"
              onSubmit={handleSubmit}
            >

              <div className="profile-fields-grid">

                {/* COMPANY NAME */}

                <div className="profile-field">

                  <label>
                    Company name
                  </label>

                  <input
                    type="text"
                    name="company_name"
                    value={form.company_name}
                    onChange={handleChange}
                    placeholder="ABC Software Solutions"
                  />

                </div>


                {/* INDUSTRY */}

                <div className="profile-field">

                  <label>
                    Industry
                  </label>

                  <input
                    type="text"
                    name="industry"
                    value={form.industry}
                    onChange={handleChange}
                    placeholder="Software Development"
                  />

                </div>


                {/* PERMIT */}

                <div className="profile-field">

                  <label>
                    Business permit number
                  </label>

                  <input
                    type="text"
                    name="permit_number"
                    value={form.permit_number}
                    onChange={handleChange}
                    placeholder="BP-2024-88112"
                  />

                </div>


                {/* EMAIL */}

                <div className="profile-field">

                  <label>
                    Contact email
                  </label>

                  <input
                    type="email"
                    name="contact_email"
                    value={form.contact_email}
                    onChange={handleChange}
                    placeholder="careers@abcsoftware.ph"
                  />

                </div>

              </div>


              {/* ADDRESS */}

              <div className="profile-field full">

                <label>
                  Office address
                </label>

                <input
                  type="text"
                  name="office_address"
                  value={form.office_address}
                  onChange={handleChange}
                  placeholder="Cebu Business Park, Cebu City"
                />

              </div>


              {/* ABOUT */}

              <div className="profile-field full">

                <label>
                  About the company
                </label>

                <textarea
                  name="about"
                  rows="5"
                  value={form.about}
                  onChange={handleChange}
                  placeholder="Tell graduates about your company..."
                />

              </div>


              {/* SAVE */}

              <button
                type="submit"
                className="save-profile-button"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : "Save changes"}
              </button>

            </form>


            {/* ==================================================
                COMPANY CARD
            ================================================== */}

            <aside className="company-preview-card">

              <div className="company-preview-avatar">
                {avatarLetter}
              </div>

              <h2>
                {companyName}
              </h2>

              <p className="company-preview-industry">
                {form.industry ||
                  "Software Development"}
              </p>

              <span className="verified-badge">
                Verified
              </span>

              <p className="verification-text">
                Only PESO-verified organizations
                can publish internships.
              </p>

            </aside>

          </div>

        </div>

      </main>

    </div>
  );
}

export default CompanyProfile;