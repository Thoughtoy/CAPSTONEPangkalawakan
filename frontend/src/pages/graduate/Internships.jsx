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
  Briefcase,
  MapPin,
  Clock,
  Building2,
  Send,
} from "lucide-react";
import "../../styles/GraduateDashboard.css";

function GraduateInternships() {
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

  // Dummy internship listings
  const dummyInternships = [
    {
      id: 1,
      title: "Frontend Developer Intern",
      company: "ABC Tech Solutions",
      location: "Cebu City (Hybrid)",
      type: "Full-time",
      posted: "2 days ago",
      skills: ["React", "JavaScript", "CSS"],
      description: "Build responsive web applications with modern frontend frameworks.",
    },
    {
      id: 2,
      title: "Backend Developer Intern",
      company: "CodeLabs Inc.",
      location: "Remote",
      type: "Part-time",
      posted: "5 days ago",
      skills: ["Node.js", "Python", "SQL"],
      description: "Develop and maintain server-side logic and APIs.",
    },
    {
      id: 3,
      title: "UI/UX Design Intern",
      company: "DesignHub Studio",
      location: "Manila",
      type: "Full-time",
      posted: "1 week ago",
      skills: ["Figma", "User Research", "Prototyping"],
      description: "Create intuitive and visually appealing user interfaces.",
    },
    {
      id: 4,
      title: "Data Analyst Intern",
      company: "DataDriven Co.",
      location: "Cebu City (On-site)",
      type: "Full-time",
      posted: "3 days ago",
      skills: ["Python", "Excel", "Tableau"],
      description: "Analyze data sets and generate insights for business decisions.",
    },
    {
      id: 5,
      title: "Mobile App Developer Intern",
      company: "AppGenix",
      location: "Remote",
      type: "Contract",
      posted: "1 day ago",
      skills: ["Flutter", "Dart", "Firebase"],
      description: "Build cross-platform mobile applications using Flutter.",
    },
  ];

  const [internships, setInternships] = useState(dummyInternships);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all"); // all, Full-time, Part-time, Contract
  const [filterLocation, setFilterLocation] = useState("all");

  // Unique locations and types for filter dropdowns
  const locations = ["all", ...new Set(dummyInternships.map((i) => i.location))];
  const types = ["all", "Full-time", "Part-time", "Contract"];

  // Filter and search
  const filteredInternships = internships.filter((internship) => {
    const matchesSearch =
      internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesType = filterType === "all" || internship.type === filterType;
    const matchesLocation =
      filterLocation === "all" || internship.location === filterLocation;
    return matchesSearch && matchesType && matchesLocation;
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
            <h1>Browse Internships</h1>
            <p>{userName}</p>
          </div>
          <div className="graduate-avatar">{avatarLetter}</div>
        </header>

        <div className="graduate-content">
          {/* Search and Filter Bar */}
          <div className="dashboard-panel" style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
              {/* Search */}
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
                  placeholder="Search by title, company, or skill..."
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

              {/* Type filter */}
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                style={{
                  padding: "10px 16px",
                  border: "1px solid #dbe4ee",
                  borderRadius: "12px",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "14px",
                  color: "#062b5c",
                  background: "white",
                  cursor: "pointer",
                }}
              >
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type === "all" ? "All Types" : type}
                  </option>
                ))}
              </select>

              {/* Location filter */}
              <select
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                style={{
                  padding: "10px 16px",
                  border: "1px solid #dbe4ee",
                  borderRadius: "12px",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "14px",
                  color: "#062b5c",
                  background: "white",
                  cursor: "pointer",
                }}
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc === "all" ? "All Locations" : loc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Internship Cards */}
          <div className="dashboard-panel">
            <div className="panel-header">
              <h2>
                {filteredInternships.length === 0
                  ? "No internships found"
                  : `${filteredInternships.length} internship${filteredInternships.length > 1 ? "s" : ""} found`}
              </h2>
            </div>

            {filteredInternships.length === 0 ? (
              <p className="empty-message">
                No internships match your current filters. Try adjusting your search or criteria.
              </p>
            ) : (
              <div className="applicant-list">
                {filteredInternships.map((internship) => (
                  <div key={internship.id} className="applicant-item" style={{ flexDirection: "column", alignItems: "flex-start", gap: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "flex-start" }}>
                      <div style={{ flex: 1 }}>
                        <strong style={{ fontSize: "18px" }}>{internship.title}</strong>
                        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "6px" }}>
                          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                            <Building2 size={14} />
                            {internship.company}
                          </span>
                          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                            <MapPin size={14} />
                            {internship.location}
                          </span>
                          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                            <Clock size={14} />
                            {internship.posted}
                          </span>
                        </div>
                        <p style={{ margin: "8px 0", color: "#647a96", fontSize: "14px" }}>
                          {internship.description}
                        </p>
                        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                          {internship.skills.map((skill) => (
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
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
                        <span className="status-badge open">{internship.type}</span>
                        <button
                          style={{
                            background: "#0877d1",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            padding: "8px 16px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: 500,
                          }}
                          onClick={() => {
                            // Placeholder for applying – will be implemented later
                            alert(`Apply to ${internship.title} at ${internship.company}`);
                          }}
                        >
                          <Send size={16} />
                          Apply
                        </button>
                      </div>
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

export default GraduateInternships;