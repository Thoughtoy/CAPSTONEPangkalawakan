import { useState } from "react";
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
  MapPin,
  Briefcase,
} from "lucide-react";
import "../../styles/GraduateDashboard.css";

function GraduateRecommendations() {
  const navigate = useNavigate();
  const location = useLocation();

  // User info (same as before)
  let storedUser = null;
  try {
    const stored = localStorage.getItem("user");
    storedUser = stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.warn("Invalid user data in localStorage:", error);
  }

  const userName = storedUser?.name || "Guest";
  const avatarLetter = userName.charAt(0).toUpperCase();

  // ---------- Dummy recommendations data ----------
  const [recommendations] = useState([
    {
      id: 1,
      title: "Frontend Developer Intern",
      company: "ABC Tech Solutions",
      location: "Cebu City (Hybrid)",
      match: 95,
      skills: ["React", "JavaScript", "CSS"],
    },
    {
      id: 2,
      title: "Backend Developer Intern",
      company: "CodeLabs Inc.",
      location: "Remote",
      match: 88,
      skills: ["Node.js", "Python", "SQL"],
    },
    {
      id: 3,
      title: "UI/UX Design Intern",
      company: "DesignHub Studio",
      location: "Manila",
      match: 82,
      skills: ["Figma", "User Research", "Prototyping"],
    },
    {
      id: 4,
      title: "Data Analyst Intern",
      company: "DataDriven Co.",
      location: "Cebu City (On-site)",
      match: 78,
      skills: ["Python", "Excel", "Tableau"],
    },
  ]);

  // ---------- Logout ----------
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // ---------- Sidebar active detection ----------
  const isDashboard = location.pathname === "/graduate/dashboard";
  const isBrowse = location.pathname === "/graduate/internships/browse";
  const isMyApplications = location.pathname === "/graduate/applications";
  const isSkills = location.pathname === "/graduate/skills";
  const isRecommendations = location.pathname === "/graduate/recommendations";
  const isProfile = location.pathname === "/graduate/profile";

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
            <h1>Recommendations</h1>
            <p>{userName}</p>
          </div>
          <div className="graduate-avatar">{avatarLetter}</div>
        </header>

        <div className="graduate-content">
          <div className="dashboard-panel">
            <div className="panel-header">
              <h2>Recommended for You</h2>
              <button
                type="button"
                className="view-all-button"
                onClick={() => navigate("/graduate/internships/browse")}
              >
                Browse All
              </button>
            </div>

            {recommendations.length === 0 ? (
              <p className="empty-message">No recommendations yet.</p>
            ) : (
              <div className="applicant-list">
                {recommendations.map((rec) => (
                  <div key={rec.id} className="applicant-item">
                    <div>
                      <strong>{rec.title}</strong>
                      <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <Briefcase size={14} />
                        {rec.company}
                        <MapPin size={14} style={{ marginLeft: "12px" }} />
                        {rec.location}
                      </span>
                      <div style={{ marginTop: "8px", display: "flex", gap: "6px", flexWrap: "wrap" }}>
                        {rec.skills.map((skill) => (
                          <span
                            key={skill}
                            style={{
                              background: "#eef5fc",
                              color: "#0877d1",
                              padding: "2px 10px",
                              borderRadius: "12px",
                              fontSize: "13px",
                              fontWeight: 500,
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="applicant-result">
                      <strong>{rec.match}%</strong>
                      <span className="status-badge accepted">Match</span>
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

export default GraduateRecommendations;