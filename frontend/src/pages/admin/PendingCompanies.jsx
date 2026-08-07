import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PendingCompanies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPendingCompanies = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/admin/companies/pending",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load companies.");
      }

      setCompanies(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingCompanies();
  }, []);

  if (loading) {
    return <p>Loading pending companies...</p>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>Company Verification</h1>

      <p>Review companies waiting for PESO verification.</p>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      {companies.length === 0 ? (
        <p>No pending companies.</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              <th>Company</th>
              <th>Business Type</th>
              <th>Contact Person</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {companies.map((company) => (
              <tr key={company.id}>
                <td>{company.company_name}</td>
                <td>{company.business_type}</td>
                <td>{company.contact_person}</td>
                <td>{company.email}</td>
                <td>{company.status}</td>

                <td>
                  <Link to={`/admin/companies/${company.id}`}>
  Review
</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PendingCompanies;