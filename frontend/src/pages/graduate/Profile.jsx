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
  Save,
  X,
  Edit3,
} from "lucide-react";
import "../../styles/GraduateDashboard.css";

function GraduateProfile() {
  const navigate = useNavigate();
  const location = useLocation();

  // ---------- User from localStorage ----------
  const getStoredUser = () => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  };

  const [user, setUser] = useState(getStoredUser);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    education: user?.education || "",
    skills: user?.skills || "",
    resumeUrl: user?.resumeUrl || "",
  });

  useEffect(() => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      education: user?.education || "",
      skills: user?.skills || "",
      resumeUrl: user?.resumeUrl || "",
    });
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const updatedUser = { ...user, ...formData };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      education: user?.education || "",
      skills: user?.skills || "",
      resumeUrl: user?.resumeUrl || "",
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const userName = user?.name || "Guest";
  const avatarLetter = userName.charAt(0).toUpperCase();

  // Sidebar active detection
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
            <h1>My Profile</h1>
            <p>{userName}</p>
          </div>
          <div className="graduate-avatar">{avatarLetter}</div>
        </header>

        <div className="graduate-content">
          <div className="dashboard-panel" style={{ maxWidth: "700px" }}>
            {/* View mode */}
            {!isEditing ? (
              <>
                <div className="panel-header">
                  <h2>Personal Details</h2>
                  <button
                    className="view-all-button"
                    onClick={() => setIsEditing(true)}
                    style={{ display: "flex", alignItems: "center", gap: "6px" }}
                  >
                    <Edit3 size={16} />
                    Edit
                  </button>
                </div>

                <div className="profile-details-grid" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    <div style={{ flex: "1 1 200px" }}>
                      <span className="label" style={{ display: "block", color: "#58708f", fontSize: "14px", marginBottom: "4px" }}>Full Name</span>
                      <strong>{user?.name || "Not provided"}</strong>
                    </div>
                    <div style={{ flex: "1 1 200px" }}>
                      <span className="label" style={{ display: "block", color: "#58708f", fontSize: "14px", marginBottom: "4px" }}>Email</span>
                      <strong>{user?.email || "Not provided"}</strong>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    <div style={{ flex: "1 1 200px" }}>
                      <span className="label" style={{ display: "block", color: "#58708f", fontSize: "14px", marginBottom: "4px" }}>Phone</span>
                      <strong>{user?.phone || "Not provided"}</strong>
                    </div>
                    <div style={{ flex: "1 1 200px" }}>
                      <span className="label" style={{ display: "block", color: "#58708f", fontSize: "14px", marginBottom: "4px" }}>Education</span>
                      <strong>{user?.education || "Not provided"}</strong>
                    </div>
                  </div>
                  <div>
                    <span className="label" style={{ display: "block", color: "#58708f", fontSize: "14px", marginBottom: "4px" }}>Skills</span>
                    <strong>{user?.skills || "Not provided"}</strong>
                  </div>
                  <div>
                    <span className="label" style={{ display: "block", color: "#58708f", fontSize: "14px", marginBottom: "4px" }}>Resume</span>
                    {user?.resumeUrl ? (
                      <a href={user.resumeUrl} target="_blank" rel="noreferrer" style={{ color: "#0877d1", fontWeight: 500 }}>
                        View Resume
                      </a>
                    ) : (
                      <strong>Not provided</strong>
                    )}
                  </div>
                </div>
              </>
            ) : (
              /* Edit mode */
              <>
                <div className="panel-header">
                  <h2>Edit Profile</h2>
                  <button
                    className="view-all-button"
                    onClick={handleCancel}
                    style={{ display: "flex", alignItems: "center", gap: "6px" }}
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    <div style={{ flex: "1 1 200px" }}>
                      <label style={{ display: "block", color: "#58708f", fontSize: "14px", marginBottom: "4px" }}>Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          border: "1px solid #dbe4ee",
                          borderRadius: "10px",
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "14px",
                          outline: "none",
                        }}
                      />
                    </div>
                    <div style={{ flex: "1 1 200px" }}>
                      <label style={{ display: "block", color: "#58708f", fontSize: "14px", marginBottom: "4px" }}>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          border: "1px solid #dbe4ee",
                          borderRadius: "10px",
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "14px",
                          outline: "none",
                        }}
                      />
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    <div style={{ flex: "1 1 200px" }}>
                      <label style={{ display: "block", color: "#58708f", fontSize: "14px", marginBottom: "4px" }}>Phone</label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          border: "1px solid #dbe4ee",
                          borderRadius: "10px",
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "14px",
                          outline: "none",
                        }}
                      />
                    </div>
                    <div style={{ flex: "1 1 200px" }}>
                      <label style={{ display: "block", color: "#58708f", fontSize: "14px", marginBottom: "4px" }}>Education</label>
                      <input
                        type="text"
                        name="education"
                        value={formData.education}
                        onChange={handleInputChange}
                        placeholder="e.g., BS Computer Science"
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          border: "1px solid #dbe4ee",
                          borderRadius: "10px",
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "14px",
                          outline: "none",
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: "block", color: "#58708f", fontSize: "14px", marginBottom: "4px" }}>Skills (comma-separated)</label>
                    <input
                      type="text"
                      name="skills"
                      value={formData.skills}
                      onChange={handleInputChange}
                      placeholder="e.g., React, Node.js, Python"
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        border: "1px solid #dbe4ee",
                        borderRadius: "10px",
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "14px",
                        outline: "none",
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", color: "#58708f", fontSize: "14px", marginBottom: "4px" }}>Resume Link</label>
                    <input
                      type="url"
                      name="resumeUrl"
                      value={formData.resumeUrl}
                      onChange={handleInputChange}
                      placeholder="https://your-resume-link.com"
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        border: "1px solid #dbe4ee",
                        borderRadius: "10px",
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "14px",
                        outline: "none",
                      }}
                    />
                  </div>

                  <button
                    onClick={handleSave}
                    style={{
                      alignSelf: "flex-start",
                      padding: "10px 24px",
                      background: "#0877d1",
                      color: "white",
                      border: "none",
                      borderRadius: "10px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 600,
                      fontSize: "15px",
                    }}
                  >
                    <Save size={18} />
                    Save Changes
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default GraduateProfile;