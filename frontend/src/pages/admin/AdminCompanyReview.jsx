import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function AdminCompanyReview() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [company, setCompany] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const fetchCompany = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/admin/companies/${id}`,
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
          data.message || "Unable to load company."
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
  }, [id]);

  const handleApprove = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to approve this company?"
    );

    if (!confirmed) return;

    setProcessing(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/admin/companies/${id}/approve`,
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
          data.message || "Unable to approve company."
        );
      }

      setCompany(data.company);
      setMessage("Company approved successfully.");
    } catch (error) {
      setError(error.message);
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      setError("Please provide a rejection reason.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to reject this company?"
    );

    if (!confirmed) return;

    setProcessing(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/admin/companies/${id}/reject`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            rejection_reason: rejectionReason,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to reject company."
        );
      }

      setCompany(data.company);
      setMessage("Company rejected successfully.");
      setRejectionReason("");
    } catch (error) {
      setError(error.message);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "30px" }}>
        Loading company information...
      </div>
    );
  }

  if (!company) {
    return (
      <div style={{ padding: "30px" }}>
        <h2>Company not found.</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <button
        onClick={() => navigate("/admin/companies")}
        style={{ marginBottom: "20px" }}
      >
        ← Back to Companies
      </button>

      <h1>Company Verification</h1>

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

      <div
        style={{
          border: "1px solid #ddd",
          padding: "20px",
          marginTop: "20px",
        }}
      >
        <h2>{company.company_name}</h2>

        <p>
          <strong>Status:</strong>{" "}
          {company.status}
        </p>

        <p>
          <strong>Business Type:</strong>{" "}
          {company.business_type}
        </p>

        <p>
          <strong>Description:</strong>{" "}
          {company.description}
        </p>

        <p>
          <strong>Address:</strong>{" "}
          {company.address}
        </p>

        <p>
          <strong>Contact Person:</strong>{" "}
          {company.contact_person}
        </p>

        <p>
          <strong>Contact Number:</strong>{" "}
          {company.contact_number}
        </p>

        <p>
          <strong>Email:</strong>{" "}
          {company.email}
        </p>

        <p>
          <strong>Website:</strong>{" "}
          {company.website || "Not provided"}
        </p>

        {company.rejection_reason && (
          <p>
            <strong>Previous Rejection Reason:</strong>{" "}
            {company.rejection_reason}
          </p>
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

        {!company.documents ||
        company.documents.length === 0 ? (
          <p>No documents uploaded.</p>
        ) : (
          company.documents.map((document) => (
            <div
              key={document.id}
              style={{ marginBottom: "10px" }}
            >
              <strong>
                {document.document_type}
              </strong>

              {" — "}

              <a
                href={`http://127.0.0.1:8000/storage/${document.file_path}`}
                target="_blank"
                rel="noreferrer"
              >
                View Document
              </a>
            </div>
          ))
        )}
      </div>

      {company.status === "pending" && (
        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            marginTop: "20px",
          }}
        >
          <h2>Verification Decision</h2>

          <button
            onClick={handleApprove}
            disabled={processing}
            style={{
              padding: "10px 20px",
              marginRight: "10px",
            }}
          >
            Approve Company
          </button>

          <hr style={{ margin: "25px 0" }} />

          <label>
            <strong>Reason for Rejection</strong>
          </label>

          <textarea
            value={rejectionReason}
            onChange={(e) =>
              setRejectionReason(e.target.value)
            }
            placeholder="Explain why the company was rejected..."
            rows="5"
            style={{
              width: "100%",
              marginTop: "10px",
              padding: "10px",
              boxSizing: "border-box",
            }}
          />

          <button
            onClick={handleReject}
            disabled={processing}
            style={{
              padding: "10px 20px",
              marginTop: "10px",
            }}
          >
            Reject Company
          </button>
        </div>
      )}

      {company.status === "approved" && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            background: "#dcfce7",
          }}
        >
          This company has been approved.
        </div>
      )}

      {company.status === "rejected" && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            background: "#fee2e2",
          }}
        >
          <strong>Company Rejected</strong>

          <p>
            {company.rejection_reason}
          </p>
        </div>
      )}
    </div>
  );
}

export default AdminCompanyReview;