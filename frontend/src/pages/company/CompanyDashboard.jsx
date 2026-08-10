import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./../../styles/CompanyDashboard.css";

function CompanyDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const token = localStorage.getItem("token");

  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

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

  const handleResubmit = async () => {
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/company/resubmit",
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to resubmit."
        );
      }

      setCompany(data.company);

      setMessage(
        "Company application resubmitted successfully."
      );
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "30px" }}>
        Loading company dashboard...
      </div>
    );
  }

  return (
  <div className="company-dashboard">

    {/* SIDEBAR */}
    <aside className="company-sidebar">

      <div className="sidebar-logo">
        SkillBridge
      </div>

      <nav className="sidebar-nav">

        <button className="sidebar-item active">
          <span>⌂</span>
          Dashboard
        </button>

        <button className="sidebar-item">
          <span>▣</span>
          My Internships
        </button>

        <button className="sidebar-item">
          <span>+</span>
          Post Internship
        </button>

        <button className="sidebar-item">
          <span>♙</span>
          Applicants
        </button>

        <button className="sidebar-item">
          <span>✓</span>
          Verification
        </button>

        <button className="sidebar-item">
          <span>⚙</span>
          Settings
        </button>

      </nav>

      <button
        className="sidebar-logout"
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        }}
      >
        Logout
      </button>

    </aside>


    {/* MAIN CONTENT */}
    <main className="company-main">

      <header className="dashboard-header">
        <div>
          <h1>Dashboard</h1>

          <p>
            Welcome back,{" "}
            <strong>{user?.name || "Company"}</strong>
          </p>
        </div>
      </header>


      {/* ERROR */}
      {error && (
        <div className="company-alert company-alert-error">
          {error}
        </div>
      )}


      {/* SUCCESS */}
      {message && (
        <div className="company-alert company-alert-success">
          {message}
        </div>
      )}


      {company && (
        <>

          {/* STAT CARDS */}
          <section className="dashboard-cards">

            <div className="dashboard-card">
              <span className="card-label">
                Verification Status
              </span>

              <strong className="card-value">
                {company.status}
              </strong>
            </div>

            <div className="dashboard-card">
              <span className="card-label">
                Internship Posts
              </span>

              <strong className="card-value">
                0
              </strong>
            </div>

            <div className="dashboard-card">
              <span className="card-label">
                Applicants
              </span>

              <strong className="card-value">
                0
              </strong>
            </div>

          </section>


          {/* COMPANY INFORMATION */}
          <section className="dashboard-section">

            <h2>Company Information</h2>

            <div className="company-info-grid">

              <div>
                <span>Company Name</span>
                <strong>{company.company_name}</strong>
              </div>

              <div>
                <span>Business Type</span>
                <strong>{company.business_type}</strong>
              </div>

              <div>
                <span>Contact Person</span>
                <strong>{company.contact_person}</strong>
              </div>

              <div>
                <span>Email</span>
                <strong>{company.email}</strong>
              </div>

            </div>

          </section>


          {/* VERIFICATION */}
          <section className="dashboard-section">

            <div className="section-heading">
              <div>
                <h2>Verification Status</h2>
                <p>
                  Your company verification information.
                </p>
              </div>
            </div>


            {company.status === "pending" && (
              <div className="verification pending">

                <h3>⏳ Pending Verification</h3>

                <p>
                  Your company application is currently
                  being reviewed by PESO.
                </p>

                <p>
                  Internship posting will become available
                  after approval.
                </p>

              </div>
            )}


            {company.status === "rejected" && (
              <div className="verification rejected">

                <h3>Application Rejected</h3>

                <p>
                  <strong>Reason:</strong>
                </p>

                <p>
                  {company.rejection_reason ||
                    "No reason provided."}
                </p>

                <button
                  className="dashboard-button"
                  onClick={handleResubmit}
                >
                  Resubmit Application
                </button>

              </div>
            )}


            {company.status === "approved" && (
              <div className="verification approved">

                <h3>✓ Company Verified</h3>

                <p>
                  Your company has been approved by PESO.
                </p>

                <button
                  className="dashboard-button"
                  onClick={() =>
                    navigate("/company/internships/create")
                  }
                >
                  Create Internship
                </button>

              </div>
            )}

          </section>


          {/* DOCUMENTS */}
          <section className="dashboard-section">

            <h2>Verification Documents</h2>

            {company.documents?.length > 0 ? (
              company.documents.map((document) => (
                <div
                  className="document-item"
                  key={document.id}
                >
                  {document.document_type}
                </div>
              ))
            ) : (
              <p className="empty-text">
                No verification documents uploaded yet.
              </p>
            )}

            <button
              className="dashboard-button secondary"
              onClick={() =>
                navigate("/company/verification")
              }
            >
              Manage Verification
            </button>

          </section>

        </>
      )}

    </main>

  </div>
);
}

export default CompanyDashboard;