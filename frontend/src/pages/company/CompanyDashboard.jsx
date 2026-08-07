import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div
      style={{
        padding: "30px",
        maxWidth: "900px",
        margin: "auto",
      }}
    >
      <h1>Company Dashboard</h1>

      <p>
        Welcome, <strong>{user?.name}</strong>
      </p>

      {error && (
        <div
          style={{
            background: "#fee2e2",
            padding: "12px",
            marginBottom: "20px",
          }}
        >
          {error}
        </div>
      )}

      {message && (
        <div
          style={{
            background: "#dcfce7",
            padding: "12px",
            marginBottom: "20px",
          }}
        >
          {message}
        </div>
      )}

      {company && (
        <>
          <div
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              marginTop: "20px",
            }}
          >
            <h2>{company.company_name}</h2>

            <p>
              <strong>Business Type:</strong>{" "}
              {company.business_type}
            </p>

            <p>
              <strong>Contact Person:</strong>{" "}
              {company.contact_person}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {company.email}
            </p>
          </div>

          <div
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              marginTop: "20px",
            }}
          >
            <h2>Verification Status</h2>

            {company.status === "pending" && (
              <div>
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
              <div>
                <h3>❌ Application Rejected</h3>

                <p>
                  <strong>Reason:</strong>
                </p>

                <p>
                  {company.rejection_reason ||
                    "No reason provided."}
                </p>

                <button
                  onClick={handleResubmit}
                  style={{
                    padding: "10px 20px",
                    marginTop: "10px",
                  }}
                >
                  Resubmit Application
                </button>
              </div>
            )}

            {company.status === "approved" && (
              <div>
                <h3>✅ Company Verified</h3>

                <p>
                  Your company has been approved by PESO.
                </p>

                <button
                  onClick={() =>
                    navigate("/company/internships/create")
                  }
                  style={{
                    padding: "10px 20px",
                  }}
                >
                  Create Internship
                </button>
              </div>
            )}
          </div>

          <div
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              marginTop: "20px",
            }}
          >
            <h2>Verification Documents</h2>

            {company.documents?.length > 0 ? (
              company.documents.map((document) => (
                <div key={document.id}>
                  {document.document_type}
                </div>
              ))
            ) : (
              <p>No verification documents uploaded yet.</p>
            )}

            <button
              onClick={() =>
                navigate("/company/verification")
              }
              style={{
                marginTop: "10px",
                padding: "10px 20px",
              }}
            >
              Manage Verification
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CompanyDashboard;