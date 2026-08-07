import { Link } from "react-router-dom";
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  MapPin,
  Target,
  ShieldCheck,
  Gauge,
  Users,
  BriefcaseBusiness,
  Building2,
  Mail,
  Phone,
  CircleCheckBig,
} from "lucide-react";

import "../styles/Home.css";

function Home() {
  return (
    <div className="home-page">
      {/* NAVBAR */}
      <header className="home-navbar">
        <div className="home-container navbar-content">
          <a href="#home" className="home-logo">
            <div className="home-logo-icon">
              <GraduationCap size={21} strokeWidth={2.2} />
            </div>

            <span>
              Skill<span>Bridge</span>
            </span>
          </a>

          <nav className="home-nav-links">
            <a href="#about">About</a>
            <a href="#features">Features</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="home-nav-actions">
            <Link to="/login" className="nav-login">
              Login
            </Link>

            <Link to="/register" className="nav-register">
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <main>
        <section className="hero-section" id="home">
          <div className="home-container hero-grid">
            <div className="hero-content">
              <div className="hero-badge">
                <Sparkles size={16} />
                <span>Rule-based compatibility engine</span>
              </div>

              <h1>
                Bridge the gap between your skills and your first internship.
              </h1>

              <p className="hero-description">
                SkillBridge connects graduates with micro-internships from
                PESO-verified companies, comparing every opportunity against
                the skills you already have.
              </p>

              <div className="hero-actions">
                <Link to="/register" className="hero-primary-button">
                  Get started free
                  <ArrowRight size={18} />
                </Link>

                <Link to="/login" className="hero-secondary-button">
                  I already have an account
                </Link>
              </div>

              <div className="hero-stats">
                <div className="hero-stat">
                  <strong>50%+</strong>
                  <span>Minimum compatibility</span>
                </div>

                <div className="hero-stat">
                  <strong>3</strong>
                  <span>Dedicated user roles</span>
                </div>

                <div className="hero-stat">
                  <strong>100%</strong>
                  <span>Transparent scoring</span>
                </div>
              </div>
            </div>

            {/* SAMPLE RECOMMENDATION */}
            <div className="recommendation-card">
              <p className="sample-label">SAMPLE RECOMMENDATION</p>

              <div className="recommendation-heading">
                <div>
                  <h3>Frontend Developer Intern</h3>
                  <p>ABC Software Solutions</p>
                </div>

                <div className="match-score">
                  <strong>80%</strong>
                  <span>MATCH</span>
                </div>
              </div>

              <div className="skill-group">
                <span className="skill-label">Matched skills</span>

                <div className="skill-tags">
                  <span className="skill-tag matched">HTML</span>
                  <span className="skill-tag matched">CSS</span>
                  <span className="skill-tag matched">JavaScript</span>
                </div>
              </div>

              <div className="skill-group">
                <span className="skill-label">Missing skills</span>

                <div className="skill-tags">
                  <span className="skill-tag missing">React</span>
                </div>
              </div>

              <div className="recommendation-divider" />

              <div className="recommendation-meta">
                <span>
                  <MapPin size={16} />
                  Los Baños, Laguna
                </span>

                <span>80 Hours</span>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="about-section" id="about">
          <div className="home-container about-grid">
            <div className="about-copy">
              <span className="section-eyebrow">ABOUT SKILLBRIDGE</span>

              <h2>
                A transparent matching platform, not a black box.
              </h2>

              <p>
                SkillBridge helps shorten the path from graduation to practical
                work experience. Instead of guessing, the platform compares a
                graduate&apos;s saved skills against each internship&apos;s
                required skills and presents the resulting compatibility score.
              </p>

              <p>
                Companies are reviewed by a PESO Administrator before they can
                publish internships, helping ensure that opportunities shown to
                graduates come from verified organizations.
              </p>
            </div>

            <div className="formula-card">
              <h3>How the score is computed</h3>

              <div className="formula-box">
                Compatibility = (Matched Skills ÷ Required Skills) × 100
              </div>

              <div className="formula-steps">
                <div className="formula-step">
                  <span>1</span>
                  <p>Retrieve the graduate&apos;s saved skills</p>
                </div>

                <div className="formula-step">
                  <span>2</span>
                  <p>Retrieve the internship&apos;s required skills</p>
                </div>

                <div className="formula-step">
                  <span>3</span>
                  <p>Compare required skills and count matching skills</p>
                </div>

                <div className="formula-step">
                  <span>4</span>
                  <p>
                    Recommend opportunities that meet the compatibility
                    threshold
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="features-section" id="features">
          <div className="home-container">
            <div className="section-heading">
              <span className="section-eyebrow">PLATFORM FEATURES</span>

              <h2>
                Everything three roles need, in one platform.
              </h2>
            </div>

            <div className="features-grid">
              <FeatureCard
                icon={<Target size={22} />}
                title="Rule-Based Matching"
                text="Internships are evaluated using standardized graduate and internship skill records."
              />

              <FeatureCard
                icon={<Sparkles size={22} />}
                title="Skill Gap Guidance"
                text="Graduates can identify which required skills they already have and which skills are missing."
              />

              <FeatureCard
                icon={<ShieldCheck size={22} />}
                title="PESO Verified Companies"
                text="Companies submit business documents for PESO review before they can publish internships."
              />

              <FeatureCard
                icon={<Gauge size={22} />}
                title="Application Tracking"
                text="Graduates track applications while companies review applicants and update application status."
              />

              <FeatureCard
                icon={<Users size={22} />}
                title="Three Role Workspaces"
                text="Dedicated dashboards and functionality for Graduates, Companies, and the PESO Administrator."
              />

              <FeatureCard
                icon={<BriefcaseBusiness size={22} />}
                title="Internship Management"
                text="Verified companies can create, edit, manage, and close their micro-internship opportunities."
              />
            </div>

            {/* ROLES */}
            <div className="roles-grid">
              <RoleCard
                icon={<GraduationCap size={21} />}
                title="Graduate"
                text="Build a profile, select standardized skills, browse internships, apply, and track progress."
              />

              <RoleCard
                icon={<Building2 size={21} />}
                title="Company"
                text="Publish internships, define required skills, review applicants, and schedule interviews."
              />

              <RoleCard
                icon={<ShieldCheck size={21} />}
                title="PESO Admin"
                text="Verify companies, manage master skills, review skill requests, and monitor system activity."
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="home-cta-section">
          <div className="home-container home-cta">
            <div>
              <span className="section-eyebrow cta-eyebrow">
                START WITH SKILLBRIDGE
              </span>

              <h2>
                Your skills can lead to your next opportunity.
              </h2>

              <p>
                Create an account and start building your SkillBridge profile.
              </p>
            </div>

            <Link to="/register" className="cta-button">
              Create an account
              <ArrowRight size={19} />
            </Link>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="home-footer" id="contact">
        <div className="home-container footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-logo-icon">
                <GraduationCap size={18} />
              </div>

              <span>
                Skill<span>Bridge</span>
              </span>
            </div>

            <p>
              A rule-based skill compatibility platform connecting graduates
              with micro-internship opportunities.
            </p>
          </div>

          <div className="footer-column">
            <h4>Platform</h4>

            <a href="#about">About</a>
            <a href="#features">Features</a>
            <Link to="/register">Create account</Link>
            <Link to="/login">Login</Link>
          </div>

          <div className="footer-column">
            <h4>Contact</h4>

            <span>
              <Mail size={16} />
              support@skillbridge.ph
            </span>

            <span>
              <Phone size={16} />
              PESO Office
            </span>

            <span>
              <CircleCheckBig size={16} />
              Company verification support
            </span>
          </div>
        </div>

        <div className="home-container footer-bottom">
          <span>© 2026 SkillBridge. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <article className="feature-card">
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function RoleCard({ icon, title, text }) {
  return (
    <article className="role-card">
      <div className="role-icon">{icon}</div>

      <h3>{title}</h3>

      <p>{text}</p>
    </article>
  );
}

export default Home;