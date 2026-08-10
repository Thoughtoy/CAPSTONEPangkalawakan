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
  MapPin,
  Clock3,
  UserRound,
} from "lucide-react";

import "../../styles/MyInternships.css";

function MyInternships() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [listings, setListings] = useState([
    {
      id: 1,
      title: "Frontend Developer Intern",
      posted: "2026-07-14",
      description:
        "Support the product team in building responsive interfaces for our client dashboards. You will work...",
      skills: ["HTML", "CSS", "JavaScript", "React"],
      location: "Cebu City (Hybrid)",
      duration: "3 months",
      applicants: 1,
      status: "Open",
    },
    {
      id: 2,
      title: "Backend Developer Intern",
      posted: "2026-07-20",
      description:
        "Assist in maintaining Laravel APIs, writing MySQL queries and documenting endpoints for the interna...",
      skills: ["PHP", "Laravel", "MySQL", "Git"],
      location: "Remote",
      duration: "2 months",
      applicants: 1,
      status: "Open",
    },
  ]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleCloseListing = (id) => {
    setListings((currentListings) =>
      currentListings.map((listing) =>
        listing.id === id
          ? { ...listing, status: "Closed" }
          : listing
      )
    );
  };

  return (
    <div className="internships-page">

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

  <button
    type="button"
    className="sidebar-item"
    onClick={() =>
      navigate("/company/dashboard")
    }
  >
    <LayoutDashboard size={20} />
    <span>Dashboard</span>
  </button>

  <button
    type="button"
    className="sidebar-item"
    onClick={() =>
      navigate("/company/internships/create")
    }
  >
    <FilePlus2 size={20} />
    <span>Create Internship</span>
  </button>

  <button
    type="button"
    className="sidebar-item active"
    onClick={() =>
      navigate("/company/internships")
    }
  >
    <BriefcaseBusiness size={20} />
    <span>My Internships</span>
  </button>

  <button
    type="button"
    className="sidebar-item"
    onClick={() =>
      navigate("/company/applicants")
    }
  >
    <Users size={20} />
    <span>Applicants</span>
  </button>

  <button
    type="button"
    className="sidebar-item"
    onClick={() =>
      navigate("/company/profile")
    }
  >
    <Building2 size={20} />
    <span>Company Profile</span>
  </button>

</nav>

        <button
          className="sidebar-logout"
          onClick={handleLogout}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>

      </aside>


      {/* =========================
          MAIN
      ========================= */}
      <main className="internships-main">

        {/* STICKY HEADER */}
        <header className="internships-header">

          <div>
            <h1>My Internships</h1>

            <p>
              {listings.length} listing(s) published
            </p>
          </div>

          <div className="company-avatar">
            {(user?.name || "A")
              .charAt(0)
              .toUpperCase()}
          </div>

        </header>


        {/* CONTENT */}
        <div className="internships-content">

          <div className="internship-grid">

            {listings.map((listing) => (

              <article
                className="internship-card"
                key={listing.id}
              >

                {/* CARD TOP */}
                <div className="internship-card-top">

                  <div>
                    <h2>{listing.title}</h2>

                    <p className="posted-date">
                      Posted {listing.posted}
                    </p>
                  </div>

                  <span
                    className={`listing-status ${
                      listing.status === "Open"
                        ? "open"
                        : "closed"
                    }`}
                  >
                    {listing.status}
                  </span>

                </div>


                {/* DESCRIPTION */}
                <p className="internship-description">
                  {listing.description}
                </p>


                {/* SKILLS */}
                <div className="internship-skills">

                  {listing.skills.map((skill) => (
                    <span
                      className="skill-badge"
                      key={skill}
                    >
                      {skill}
                    </span>
                  ))}

                </div>


                {/* META */}
                <div className="internship-meta">

                  <div>
                    <MapPin size={18} />
                    <span>{listing.location}</span>
                  </div>

                  <div>
                    <Clock3 size={18} />
                    <span>{listing.duration}</span>
                  </div>

                  <div>
                    <UserRound size={18} />
                    <span>
                      {listing.applicants} applicant(s)
                    </span>
                  </div>

                </div>


                {/* DIVIDER */}
                <div className="internship-divider" />


                {/* ACTIONS */}
                <div className="internship-actions">

                  <button
                    className="view-applicants-button"
                    onClick={() => navigate("/company/applicants")}
                  >
                    View Applicants
                  </button>

                  <button
                    className="close-listing-button"
                    disabled={listing.status === "Closed"}
                    onClick={() =>
                      handleCloseListing(listing.id)
                    }
                  >
                    {listing.status === "Closed"
                      ? "Listing closed"
                      : "Close listing"}
                  </button>

                </div>

              </article>

            ))}

          </div>

        </div>

      </main>

    </div>
  );
}

export default MyInternships;