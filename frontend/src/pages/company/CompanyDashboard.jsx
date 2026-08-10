import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  GraduationCap,
  LayoutDashboard,
  FilePlus2,
  BriefcaseBusiness,
  Users,
  Building2,
  LogOut,
  Briefcase,
  Clock3,
  CircleCheck,
  FileText,
} from "lucide-react";

import "../../styles/CompanyDashboard.css";

function CompanyDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // FETCH COMPANY PROFILE
  // =========================

  const fetchCompany = async () => {
    try {
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

      setCompany(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompany();
  }, []);

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="company-loading">
        Loading company dashboard...
      </div>
    );
  }

  // =========================
  // COMPANY NAME
  // =========================

  const companyName =
    company?.company_name ||
    user?.name ||
    "ABC Software Solutions";

  const avatarLetter = companyName
    .charAt(0)
    .toUpperCase();

  // =========================
  // SIDEBAR ACTIVE STATE
  // =========================

  const isDashboard =
    location.pathname === "/company/dashboard";

  const isCreateInternship =
    location.pathname === "/company/internships/create";

  const isMyInternships =
    location.pathname === "/company/internships";

  const isApplicants =
    location.pathname === "/company/applicants";

  const isCompanyProfile =
    location.pathname === "/company/profile";

  return (
    <div className="company-dashboard">

     {/* ================= SIDEBAR ================= */}

<aside className="company-sidebar">

  <div className="sidebar-brand">
    <div className="sidebar-brand-icon">
      <GraduationCap size={24} />
    </div>

    <span>SkillBridge</span>
  </div>

  <nav className="sidebar-nav">

    <button
      type="button"
      className={`sidebar-item ${
        location.pathname === "/company/dashboard"
          ? "active"
          : ""
      }`}
      onClick={() => navigate("/company/dashboard")}
    >
      <LayoutDashboard size={20} />
      <span>Dashboard</span>
    </button>

    <button
      type="button"
      className={`sidebar-item ${
        location.pathname === "/company/internships/create"
          ? "active"
          : ""
      }`}
      onClick={() =>
        navigate("/company/internships/create")
      }
    >
      <FilePlus2 size={20} />
      <span>Create Internship</span>
    </button>

    <button
      type="button"
      className={`sidebar-item ${
        location.pathname === "/company/internships"
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

    <button
      type="button"
      className={`sidebar-item ${
        location.pathname === "/company/applicants"
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

<button
  type="button"
  className="sidebar-item"
  onClick={() =>
    navigate("/company/profile")
  }
>
  <Building2 size={20} />
  <span>Company Profile</span>
</button>

  </nav>

  <button
    type="button"
    className="sidebar-logout"
    onClick={handleLogout}
  >
    <LogOut size={20} />
    <span>Logout</span>
  </button>

</aside>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="company-main">

        {/* ================= HEADER ================= */}

        <header className="company-header">

          <div className="company-header-info">

            <h1>
              Company Dashboard
            </h1>

            <p>
              {companyName}
            </p>

          </div>


          <div className="company-avatar">
            {avatarLetter}
          </div>

        </header>


        {/* ================= CONTENT ================= */}

        <div className="company-content">

          {/* ERROR */}

          {error && (
            <div className="company-alert company-alert-error">
              {error}
            </div>
          )}


          {/* =================================================
              STAT CARDS
          ================================================= */}

          <section className="dashboard-stat-grid">

            {/* TOTAL INTERNSHIPS */}

            <div className="stat-card">

              <div>
                <span>
                  Total Internships
                </span>

                <strong>
                  2
                </strong>
              </div>

              <div className="stat-icon blue">
                <Briefcase size={24} />
              </div>

            </div>


            {/* APPLICATIONS */}

            <div className="stat-card">

              <div>
                <span>
                  Applications Received
                </span>

                <strong>
                  2
                </strong>
              </div>

              <div className="stat-icon gray">
                <Users size={24} />
              </div>

            </div>


            {/* ACCEPTED */}

            <div className="stat-card">

              <div>
                <span>
                  Accepted Applicants
                </span>

                <strong>
                  1
                </strong>
              </div>

              <div className="stat-icon green">
                <CircleCheck size={24} />
              </div>

            </div>


            {/* PENDING */}

            <div className="stat-card">

              <div>
                <span>
                  Pending Applicants
                </span>

                <strong>
                  1
                </strong>
              </div>

              <div className="stat-icon yellow">
                <Clock3 size={24} />
              </div>

            </div>

          </section>


          {/* =================================================
              LOWER CONTENT
          ================================================= */}

          <section className="dashboard-lower-grid">

            {/* ================= LATEST APPLICANTS ================= */}

            <div className="dashboard-panel">

              <div className="panel-header">

                <h2>
                  Latest applicants
                </h2>

                <button
                  type="button"
                  className="view-all-button"
                  onClick={() =>
                    navigate("/company/applicants")
                  }
                >
                  View all
                </button>

              </div>


              <div className="applicant-list">

                {/* MARCO */}

                <div className="applicant-item">

                  <div>
                    <strong>
                      Marco Dela Cruz
                    </strong>

                    <span>
                      Backend Developer Intern
                    </span>
                  </div>


                  <div className="applicant-result">

                    <strong>
                      100%
                    </strong>

                    <span className="status-badge accepted">
                      Accepted
                    </span>

                  </div>

                </div>


                {/* ANDREA */}

                <div className="applicant-item">

                  <div>
                    <strong>
                      Andrea Villanueva
                    </strong>

                    <span>
                      Frontend Developer Intern
                    </span>
                  </div>


                  <div className="applicant-result">

                    <strong>
                      75%
                    </strong>

                    <span className="status-badge pending">
                      Pending
                    </span>

                  </div>

                </div>

              </div>

            </div>


            {/* ================= YOUR LISTINGS ================= */}

            <div className="dashboard-panel">

              <div className="panel-header">

                <h2>
                  Your listings
                </h2>

                <button
                  type="button"
                  className="new-listing-button"
                  onClick={() =>
                    navigate(
                      "/company/internships/create"
                    )
                  }
                >
                  <FileText size={18} />

                  <span>
                    New
                  </span>

                </button>

              </div>


              <div className="listing-list">

                {/* FRONTEND */}

                <div className="listing-item">

                  <div>
                    <strong>
                      Frontend Developer Intern
                    </strong>

                    <span>
                      Cebu City (Hybrid)
                    </span>
                  </div>

                  <span className="status-badge open">
                    Open
                  </span>

                </div>


                {/* BACKEND */}

                <div className="listing-item">

                  <div>
                    <strong>
                      Backend Developer Intern
                    </strong>

                    <span>
                      Remote
                    </span>
                  </div>

                  <span className="status-badge open">
                    Open
                  </span>

                </div>

              </div>

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}

export default CompanyDashboard;