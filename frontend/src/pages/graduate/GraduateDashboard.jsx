import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  GraduationCap,
  LayoutDashboard,
  Briefcase,
  Clock3,
  CircleCheck,
  FileText,
  LogOut,
  Search,
  User,
  Brain,
  Star,
} from "lucide-react";

import "../../styles/GraduateDashboard.css";

function GraduateDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  // ---------- user from localStorage (optional) ----------
  let storedUser = null;
  try {
    const stored = localStorage.getItem("user");
    storedUser = stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.warn("Invalid user data in localStorage:", error);
  }

  const token = localStorage.getItem("token");

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ---------- fetch applications ----------
  useEffect(() => {
    if (!storedUser?.id) {
      setLoading(false);
      return;
    }

    const fetchApplications = async () => {
      try {
        const response = await fetch(
          `/api/applications?userId=${storedUser.id}`
        );
        if (!response.ok) throw new Error("Failed to fetch applications");
        const data = await response.json();
        setApplications(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [storedUser?.id]);

  // ---------- logout ----------
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // ---------- computed stats ----------
  const total = applications.length;
  const accepted = applications.filter(app => app.status === "accepted").length;
  const rejected = applications.filter(app => app.status === "rejected").length;
  const pending = applications.filter(app => app.status === "pending").length;

  // ---------- user display ----------
  const userName = storedUser?.name || "Guest";
  const avatarLetter = userName.charAt(0).toUpperCase();

  // ---------- loading ----------
  if (loading) {
    return (
      <div className="graduate-loading">
        Loading graduate dashboard...
      </div>
    );
  }

  // ---------- active sidebar detection ----------
  const isDashboard = location.pathname === "/graduate/dashboard";
  const isBrowse = location.pathname === "/graduate/internships";
  const isMyApplications = location.pathname === "/graduate/applications";
  const isProfile = location.pathname === "/graduate/profile";
  const isSkills = location.pathname === "/graduate/skills";
  const isRecommendations = location.pathname === "/graduate/recommendations";

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
            <h1>Graduate Dashboard</h1>
            <p>{userName}</p>
          </div>
          <div className="graduate-avatar">{avatarLetter}</div>
        </header>

        <div className="graduate-content">
          {error && (
            <div className="graduate-alert graduate-alert-error">{error}</div>
          )}

          <section className="dashboard-stat-grid">
            <div className="stat-card">
              <div>
                <span>Total Applications</span>
                <strong>{total}</strong>
              </div>
              <div className="stat-icon blue">
                <Briefcase size={24} />
              </div>
            </div>

            <div className="stat-card">
              <div>
                <span>Pending</span>
                <strong>{pending}</strong>
              </div>
              <div className="stat-icon yellow">
                <Clock3 size={24} />
              </div>
            </div>

            <div className="stat-card">
              <div>
                <span>Accepted</span>
                <strong>{accepted}</strong>
              </div>
              <div className="stat-icon green">
                <CircleCheck size={24} />
              </div>
            </div>

            <div className="stat-card">
              <div>
                <span>Rejected</span>
                <strong>{rejected}</strong>
              </div>
              <div className="stat-icon red">
                <FileText size={24} />
              </div>
            </div>
          </section>

          <section className="dashboard-lower-grid">
            <div className="dashboard-panel">
              <div className="panel-header">
                <h2>Recent Applications</h2>
                <button
                  type="button"
                  className="view-all-button"
                  onClick={() => navigate("/graduate/applications")}
                >
                  View all
                </button>
              </div>

              <div className="applicant-list">
                {applications.length === 0 ? (
                  <p className="empty-message">No applications yet.</p>
                ) : (
                  applications.slice(0, 3).map((app) => (
                    <div key={app.id} className="applicant-item">
                      <div>
                        <strong>{app.internshipTitle || "Untitled"}</strong>
                        <span>{app.company || "Unknown company"}</span>
                      </div>
                      <div className="applicant-result">
                        <span className={`status-badge ${app.status}`}>
                          {app.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="dashboard-panel">
              <div className="panel-header">
                <h2>Quick Actions</h2>
              </div>
              <div className="listing-list">
                <div
                  className="listing-item"
                  onClick={() => navigate("/graduate/internships/browse")}
                >
                  <div>
                    <strong>Browse Internships</strong>
                    <span>Find new opportunities</span>
                  </div>
                  <Search size={20} />
                </div>
                <div
                  className="listing-item"
                  onClick={() => navigate("/graduate/applications")}
                >
                  <div>
                    <strong>My Applications</strong>
                    <span>Track your submitted applications</span>
                  </div>
                  <FileText size={20} />
                </div>
                <div
                  className="listing-item"
                  onClick={() => navigate("/graduate/profile")}
                >
                  <div>
                    <strong>Update Profile</strong>
                    <span>Keep your info up to date</span>
                  </div>
                  <User size={20} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default GraduateDashboard;