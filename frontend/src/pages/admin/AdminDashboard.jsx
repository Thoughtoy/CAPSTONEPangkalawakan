import { Link } from "react-router-dom";

function AdminDashboard() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <div style={{ padding: "30px" }}>
      <h1>PESO Administrator Dashboard</h1>

      <p>
        Welcome, {user?.name}
      </p>

      <hr />

      <h2>Company Verification</h2>

      <Link to="/admin/companies">
        View Pending Companies
      </Link>
    </div>
  );
}

export default AdminDashboard;