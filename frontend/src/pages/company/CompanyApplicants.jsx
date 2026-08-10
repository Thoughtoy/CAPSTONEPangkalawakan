import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  LayoutDashboard,
  FilePlus2,
  BriefcaseBusiness,
  Users,
  Building2,
  LogOut,
  FileText,
  Check,
  X,
} from "lucide-react";

import "../../styles/CompanyApplicants.css";

function CompanyApplicants() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [selectedInternship, setSelectedInternship] =
    useState("all");

  const [applicants, setApplicants] = useState([
    {
      id: 1,
      name: "Marco Dela Cruz",
      degree: "BS Computer Science",
      school:
        "Polytechnic University of the Philippines",
      internship: "Backend Developer Intern",
      appliedDate: "2026-07-22",
      match: 100,
      status: "Accepted",
      matchedSkills: [
        "PHP",
        "Laravel",
        "MySQL",
        "Git",
      ],
      graduateSkills: [
        "PHP",
        "Laravel",
        "MySQL",
        "Git",
        "Teamwork",
      ],
      resume: "marco-delacruz-resume.pdf",
      record:
        "2026-08-10 → 2026-10-10",
    },

    {
      id: 2,
      name: "Andrea Villanueva",
      degree: "BS Information Technology",
      school: "University of San Carlos",
      internship: "Frontend Developer Intern",
      appliedDate: "2026-08-01",
      match: 75,
      status: "Pending",
      matchedSkills: [
        "HTML",
        "CSS",
        "JavaScript",
      ],
      graduateSkills: [
        "HTML",
        "CSS",
        "JavaScript",
        "Git",
        "Communication",
      ],
      resume: "andrea-villanueva-resume.pdf",
      record: null,
    },
  ]);

  const internships = [
    "all",
    "Frontend Developer Intern",
    "Backend Developer Intern",
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleStatus = (id, status) => {
    setApplicants((current) =>
      current.map((applicant) =>
        applicant.id === id
          ? { ...applicant, status }
          : applicant
      )
    );
  };

  const filteredApplicants =
    selectedInternship === "all"
      ? applicants
      : applicants.filter(
          (applicant) =>
            applicant.internship === selectedInternship
        );

  const companyName =
    user?.name || "ABC Software Solutions";

  const avatarLetter = companyName
    .charAt(0)
    .toUpperCase();

  return (
    <div className="applicants-page">

      {/* ================= SIDEBAR ================= */}

      <aside className="applicants-sidebar">

        <div className="applicants-brand">
          <div className="applicants-brand-icon">
            <GraduationCap size={24} />
          </div>

          <span>SkillBridge</span>
        </div>

        <nav className="applicants-nav">

          <button
            className="applicants-nav-item"
            onClick={() =>
              navigate("/company/dashboard")
            }
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </button>

          <button
            className="applicants-nav-item"
            onClick={() =>
              navigate(
                "/company/internships/create"
              )
            }
          >
            <FilePlus2 size={20} />
            <span>Create Internship</span>
          </button>

          <button
            className="applicants-nav-item"
            onClick={() =>
              navigate("/company/internships")
            }
          >
            <BriefcaseBusiness size={20} />
            <span>My Internships</span>
          </button>

          <button
            className="applicants-nav-item active"
          >
            <Users size={20} />
            <span>Applicants</span>
          </button>

          <button
            className="applicants-nav-item"
            onClick={() =>
              navigate("/company/profile")
            }
          >
            <Building2 size={20} />
            <span>Company Profile</span>
          </button>

        </nav>

        <button
          className="applicants-logout"
          onClick={handleLogout}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>

      </aside>


      {/* ================= MAIN ================= */}

      <main className="applicants-main">

        {/* HEADER */}

        <header className="applicants-header">

          <div>
            <h1>Applicants</h1>

            <p>
              {applicants.length} application(s),
              ranked by compatibility
            </p>
          </div>

          <div className="applicants-avatar">
            {avatarLetter}
          </div>

        </header>


        {/* CONTENT */}

        <div className="applicants-content">

          {/* INTERNSHIP FILTER TABS */}

          <div className="internship-tabs">

            {internships.map((internship) => (

              <button
                key={internship}
                className={
                  selectedInternship === internship
                    ? "internship-tab active"
                    : "internship-tab"
                }
                onClick={() =>
                  setSelectedInternship(internship)
                }
              >
                {internship === "all"
                  ? "All internships"
                  : internship}
              </button>

            ))}

          </div>


          {/* APPLICANTS */}

          <div className="applicant-cards">

            {filteredApplicants.length === 0 ? (

              <div className="empty-applicants">
                No applicants found.
              </div>

            ) : (

              filteredApplicants.map((applicant) => (

                <article
                  className="applicant-card"
                  key={applicant.id}
                >

                  {/* TOP */}

                  <div className="applicant-top">

                    <div className="applicant-person">

                      <div className="applicant-avatar">
                        {applicant.name
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div>
                        <h2>
                          {applicant.name}
                        </h2>

                        <p>
                          {applicant.degree}
                          {" · "}
                          {applicant.school}
                        </p>

                        <span>
                          Applied to{" "}
                          <strong>
                            {applicant.internship}
                          </strong>{" "}
                          on{" "}
                          {applicant.appliedDate}
                        </span>
                      </div>

                    </div>


                    {/* MATCH */}

                    <div className="match-section">

                      <strong>
                        {applicant.match}%
                      </strong>

                      <span>MATCH</span>

                      <div
                        className={`applicant-status ${
                          applicant.status.toLowerCase()
                        }`}
                      >
                        {applicant.status}
                      </div>

                    </div>

                  </div>


                  {/* SKILLS */}

                  <div className="skills-grid">

                    <div className="skills-column">

                      <h3>
                        MATCHED SKILLS
                      </h3>

                      <div className="skill-tags matched">

                        {applicant.matchedSkills.map(
                          (skill) => (
                            <span key={skill}>
                              {skill}
                            </span>
                          )
                        )}

                      </div>

                    </div>


                    <div className="skills-column">

                      <h3>
                        ALL GRADUATE SKILLS
                      </h3>

                      <div className="skill-tags">

                        {applicant.graduateSkills.map(
                          (skill) => (
                            <span key={skill}>
                              {skill}
                            </span>
                          )
                        )}

                      </div>

                    </div>

                  </div>


                  {/* BOTTOM */}

                  <div className="applicant-bottom">

                    <button
                      className="resume-button"
                      type="button"
                    >
                      <FileText size={18} />

                      <span>
                        {applicant.resume}
                      </span>
                    </button>


                    {applicant.record ? (

                      <div className="internship-record">
                        <GraduationCap size={18} />

                        <span>
                          Internship record:{" "}
                          {applicant.record}
                        </span>
                      </div>

                    ) : applicant.status ===
                      "Pending" ? (

                      <div className="applicant-actions">

                        <button
                          className="accept-button"
                          onClick={() =>
                            handleStatus(
                              applicant.id,
                              "Accepted"
                            )
                          }
                        >
                          <Check size={18} />
                          Accept
                        </button>

                        <button
                          className="reject-button"
                          onClick={() =>
                            handleStatus(
                              applicant.id,
                              "Rejected"
                            )
                          }
                        >
                          <X size={18} />
                          Reject
                        </button>

                      </div>

                    ) : null}

                  </div>

                </article>

              ))

            )}

          </div>

        </div>

      </main>

    </div>
  );
}

export default CompanyApplicants;