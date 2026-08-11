import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  GraduationCap,
  LayoutDashboard,
  Search,
  FileText,
  Brain,
  Star,
  User,
  LogOut,
  Briefcase,
  MapPin,
  Filter,
  X,
} from "lucide-react";
import "../../styles/GraduateDashboard.css";

function GraduateApplications() {
  const navigate = useNavigate();
  const location = useLocation();

  // User info
  let storedUser = null;
  try {
    const stored = localStorage.getItem("user");
    storedUser = stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.warn("Invalid user data in localStorage:", error);
  }

  const userName = storedUser?.name || "Guest";
  const avatarLetter = userName.charAt(0).toUpperCase();

  // ---------- Applications state ----------
  // In production, fetch from API. For now, dummy data.
  const dummyApplications = [
    {
      id: 1,
      internshipTitle: "Frontend Developer Intern",
      company: "ABC Tech Solutions",
      location: "Cebu City",
      appliedDate: "2026-08-01",
      status: "pending",
    },
    {
      id: 2,
      internshipTitle: "Backend Developer Intern",
      company: "CodeLabs Inc.",
      location: "Remote",
      appliedDate: "2026-07-28",
      status: "accepted",
    },
    {
      id: 3,
      internshipTitle: "UI/UX Design Intern",
      company: "DesignHub Studio",
      location: "Manila",
      appliedDate: "2026-07-25",
      status: "rejected",
    },
    {
      id: 4,
      internshipTitle: "Data Analyst Intern",
      company: "DataDriven Co.",
      location: "Cebu City",
      appliedDate: "2026-07-20",
      status: "pending",
    },
  ];

  const [applications, setApplications] = useState(dummyApplications);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // all, pending, accepted, rejected

  // For future API integration:
  // useEffect(() => {
  //   const fetchApplications = async () => {
  //     const response = await fetch(`/api/applications?userId=${storedUser?.id}`);
  //     const data = await response.json();
  //     setApplications(data);
  //   };
  //   if (storedUser?.id) fetchApplications();
  // }, [storedUser]);

  // Filter and search logic
  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.internshipTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || app.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Sidebar active detection
  const isDashboard = location.pathname === "/graduate/dashboard";
  const isBrowse = location.pathname === "/graduate/internships/browse";
  const isMyApplications = location.pathname === "/graduate/applications";
  const isSkills = location.pathname === "/graduate/skills";
  const isRecommendations = location.pathname === "/graduate/recommendations";
  const isProfile = location.pathname === "/graduate/profile";

  // Status badge styling (reuses existing CSS classes)
  const getStatusBadge = (status) => {
    const map = {
      pending: "pending",
      accepted: "accepted",
      rejected: "rejected",
    };
    return <span className={`status-badge ${map[status] || "pending"}`}>{status}</span>;
  };

  return (
    <div className="graduate-dashboard">
      {/* ================= SIDEBAR ================= */}
      <aside className="graduate-sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon">
            <GraduationCap size={24} />
          </div>
          <span>SkillBridge</span>
        </div>

        <nav className="sidebar-nav">
          <button
            type="button"
            className={`sidebar-item ${isDashboard ? "active" : ""}`}
            onClick={() => navigate("/graduate/dashboard")}
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </button>

          <button
            type="button"
            className={`sidebar-item ${isBrowse ? "active" : ""}`}
            onClick={() => navigate("/graduate/internships")}
          >
            <Search size={20} />
            <span>Browse Internships</span>
          </button>

          <button
            type="button"
            className={`sidebar-item ${isMyApplications ? "active" : ""}`}
            onClick={() => navigate("/graduate/applications")}
          >
            <FileText size={20} />
            <span>My Applications</span>
          </button>

          <button
            type="button"
            className={`sidebar-item ${isSkills ? "active" : ""}`}
            onClick={() => navigate("/graduate/skills")}
          >
            <Brain size={20} />
            <span>My Skills</span>
          </button>

          <button
            type="button"
            className={`sidebar-item ${isRecommendations ? "active" : ""}`}
            onClick={() => navigate("/graduate/recommendations")}
          >
            <Star size={20} />
            <span>Recommendations</span>
          </button>

          <button
            type="button"
            className={`sidebar-item ${isProfile ? "active" : ""}`}
            onClick={() => navigate("/graduate/profile")}
          >
            <User size={20} />
            <span>Profile</span>
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

      {/* ================= MAIN CONTENT ================= */}
      <main className="graduate-main">
        <header className="graduate-header">
          <div className="graduate-header-info">
            <h1>My Applications</h1>
            <p>{userName}</p>
          </div>
          <div className="graduate-avatar">{avatarLetter}</div>
        </header>

        <div className="graduate-content">
          {/* Search and Filter Bar */}
          <div
            className="dashboard-panel"
            style={{ marginBottom: "24px" }}
          >
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
              {/* Search input */}
              <div style={{ flex: 1, position: "relative" }}>
                <Search
                  size={18}
                  style={{
                    position: "absolute",
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#647a96",
                  }}
                />
                <input
                  type="text"
                  placeholder="Search by title or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 16px 12px 40px",
                    border: "1px solid #dbe4ee",
                    borderRadius: "12px",
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
              </div>

              {/* Filter buttons */}
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {["all", "pending", "accepted", "rejected"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    style={{
                      padding: "10px 16px",
                      borderRadius: "20px",
                      border: filterStatus === status ? "2px solid #0877d1" : "1px solid #dbe4ee",
                      background: filterStatus === status ? "#e4f1ff" : "white",
                      color: filterStatus === status ? "#0877d1" : "#647a96",
                      fontWeight: filterStatus === status ? 600 : 400,
                      cursor: "pointer",
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "14px",
                    }}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Applications list */}
          <div className="dashboard-panel">
            <div className="panel-header">
              <h2>
                {filteredApplications.length === 0
                  ? "No applications found"
                  : `${filteredApplications.length} application${filteredApplications.length > 1 ? "s" : ""}`}
              </h2>
            </div>

            {filteredApplications.length === 0 ? (
              <p className="empty-message">
                No applications match your search or filter.
              </p>
            ) : (
              <div className="applicant-list">
                {filteredApplications.map((app) => (
                  <div key={app.id} className="applicant-item">
                    <div style={{ flex: 1 }}>
                      <strong>{app.internshipTitle}</strong>
                      <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <Briefcase size={14} />
                        {app.company}
                        <MapPin size={14} style={{ marginLeft: "12px" }} />
                        {app.location}
                      </span>
                      <span style={{ display: "block", marginTop: "4px", fontSize: "13px", color: "#94a3b8" }}>
                        Applied on {new Date(app.appliedDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="applicant-result">
                      {getStatusBadge(app.status)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default GraduateApplications;