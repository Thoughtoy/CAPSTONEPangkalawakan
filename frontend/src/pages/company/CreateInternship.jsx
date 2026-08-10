import { useState } from "react";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  GraduationCap,
  LayoutDashboard,
  FilePlus2,
  BriefcaseBusiness,
  Users,
  Building2,
  LogOut,
  Plus,
} from "lucide-react";

import "../../styles/CreateInternship.css";

function CreateInternship() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: "",
    location: "",
  });

  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const suggestedSkills = [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "PHP",
    "Laravel",
    "Python",
    "MySQL",
    "Git",
    "Canva",
    "Figma",
    "Communication",
    "Leadership",
    "Teamwork",
    "Time Management",
    "Data Entry",
    "SEO",
  ];

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addSkill = (skill) => {
    const cleanSkill = skill.trim();

    if (!cleanSkill) return;

    const exists = skills.some(
      (item) =>
        item.toLowerCase() === cleanSkill.toLowerCase()
    );

    if (exists) return;

    setSkills([...skills, cleanSkill]);
    setSkillInput("");
  };

  const removeSkill = (skillToRemove) => {
    setSkills(
      skills.filter(
        (skill) => skill !== skillToRemove
      )
    );
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill(skillInput);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (skills.length === 0) {
      setError(
        "Please add at least one required skill."
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/company/internships",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: form.title,
            description: form.description,
            duration: form.duration,
            location: form.location,
            skills: skills,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to publish internship."
        );
      }

      navigate("/company/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const companyName =
    user?.name || "ABC Software Solutions";

  const avatarLetter = companyName
    .charAt(0)
    .toUpperCase();

  return (
    <div className="create-internship-page">

      {/* =========================
          SIDEBAR
      ========================= */}

      <aside className="company-sidebar">

        <div className="sidebar-brand">

          <div className="sidebar-brand-icon">
            <GraduationCap size={24} />
          </div>

          <span>SkillBridge</span>

        </div>


        <nav className="sidebar-nav">

          {/* DASHBOARD */}
          <button
            className={`create-sidebar-item ${
              location.pathname ===
              "/company/dashboard"
                ? "active"
                : ""
            }`}
            onClick={() =>
              navigate("/company/dashboard")
            }
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </button>


          {/* CREATE INTERNSHIP */}
          <button
            className={`create-sidebar-item ${
              location.pathname ===
              "/company/internships/create"
                ? "active"
                : ""
            }`}
            onClick={() =>
              navigate(
                "/company/internships/create"
              )
            }
          >
            <FilePlus2 size={20} />
            <span>Create Internship</span>
          </button>


          {/* MY INTERNSHIPS */}
          <button
            className={`create-sidebar-item ${
              location.pathname ===
              "/company/internships"
                ? "active"
                : ""
            }`}
            onClick={() =>
              navigate("/company/internships")
            }
          >
            <BriefcaseBusiness size={20} />
            <span>My Internships</span>
          </button>


          {/* APPLICANTS */}
          <button
            className={`create-sidebar-item ${
              location.pathname ===
              "/company/applicants"
                ? "active"
                : ""
            }`}
            onClick={() =>
              navigate("/company/applicants")
            }
          >
            <Users size={20} />
            <span>Applicants</span>
          </button>


          {/* COMPANY PROFILE */}
          <button
            className={`create-sidebar-item ${
              location.pathname ===
              "/company/profile"
                ? "active"
                : ""
            }`}
            onClick={() =>
              navigate("/company/profile")
            }
          >
            <Building2 size={20} />
            <span>Company Profile</span>
          </button>

        </nav>


        {/* LOGOUT */}

        <button
          className="create-sidebar-logout"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/login");
          }}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>

      </aside>


      {/* =========================
          MAIN
      ========================= */}

      <main className="create-main">

        {/* STICKY HEADER */}

        <header className="create-header">

          <div>

            <h1>
              Create Internship
            </h1>

            <p>
              Required skills drive the
              compatibility score
            </p>

          </div>


          <div className="create-avatar">
            {avatarLetter}
          </div>

        </header>


        {/* CONTENT */}

        <div className="create-content">

          {error && (
            <div className="create-alert">
              {error}
            </div>
          )}


          <form
            className="create-internship-grid"
            onSubmit={handleSubmit}
          >

            {/* =========================
                LEFT FORM
            ========================= */}

            <section className="create-form-card">

              {/* TITLE */}

              <div className="create-field">

                <label>
                  Internship Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Frontend Developer Intern"
                  required
                />

              </div>


              {/* DESCRIPTION */}

              <div className="create-field">

                <label>
                  Description
                </label>

                <textarea
                  name="description"
                  rows="6"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="What the intern will work on, who they report to, and what they will learn."
                  required
                />

              </div>


              {/* DURATION + LOCATION */}

              <div className="create-two-column">

                <div className="create-field">

                  <label>
                    Duration
                  </label>

                  <input
                    type="text"
                    name="duration"
                    value={form.duration}
                    onChange={handleChange}
                    placeholder="3 months"
                    required
                  />

                </div>


                <div className="create-field">

                  <label>
                    Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Cebu City (Hybrid)"
                    required
                  />

                </div>

              </div>

            </section>


            {/* =========================
                RIGHT SKILLS
            ========================= */}

            <div className="create-skills-column">

              <section className="create-skills-card">

                <h2>
                  Required Skills
                </h2>


                {/* SKILL INPUT */}

                <div className="skill-input-row">

                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) =>
                      setSkillInput(e.target.value)
                    }
                    onKeyDown={
                      handleSkillKeyDown
                    }
                    placeholder="Add a skill"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      addSkill(skillInput)
                    }
                    className="skill-add-button"
                  >
                    <Plus size={22} />
                  </button>

                </div>


                {/* SELECTED SKILLS */}

                {skills.length === 0 ? (

                  <p className="no-skills">
                    No skills added yet.
                  </p>

                ) : (

                  <div className="selected-skills">

                    {skills.map((skill) => (

                      <button
                        type="button"
                        key={skill}
                        className="selected-skill"
                        onClick={() =>
                          removeSkill(skill)
                        }
                      >
                        {skill}
                        <span>×</span>
                      </button>

                    ))}

                  </div>

                )}


                {/* SUGGESTIONS */}

                <div className="suggestions-section">

                  <h3>
                    SUGGESTIONS
                  </h3>

                  <div className="suggestion-list">

                    {suggestedSkills.map(
                      (skill) => (

                        <button
                          type="button"
                          key={skill}
                          className="suggestion-button"
                          onClick={() =>
                            addSkill(skill)
                          }
                        >
                          + {skill}
                        </button>

                      )
                    )}

                  </div>

                </div>

              </section>


              {/* PUBLISH */}

              <button
                type="submit"
                className="publish-button"
                disabled={loading}
              >
                {loading
                  ? "Publishing..."
                  : "Publish Internship"}
              </button>

            </div>

          </form>

        </div>

      </main>

    </div>
  );
}

export default CreateInternship;