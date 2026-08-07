import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const cardStyle = {
    width: "300px",
    padding: "30px",
    border: "1px solid #2f3542",
    borderRadius: "16px",
    background: "#1b1d23",
    cursor: "pointer",
    transition: "0.2s",
    textAlign: "left",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111318",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "30px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "800px" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1 style={{ fontSize: "42px", marginBottom: "10px" }}>
            Join SkillBridge
          </h1>

          <p style={{ color: "#aeb4c0" }}>
            How would you like to join?
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: "25px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <div
            style={cardStyle}
            onClick={() => navigate("/register/graduate")}
          >
            <div style={{ fontSize: "42px" }}>🎓</div>

            <h2>Graduate</h2>

            <p style={{ color: "#aeb4c0" }}>
              Build your profile, discover opportunities, and apply
              for micro-internships.
            </p>

            <strong>Continue as Graduate →</strong>
          </div>

          <div
            style={cardStyle}
            onClick={() => navigate("/register/company")}
          >
            <div style={{ fontSize: "42px" }}>🏢</div>

            <h2>Company</h2>

            <p style={{ color: "#aeb4c0" }}>
              Register your company, complete PESO verification,
              and connect with skilled graduates.
            </p>

            <strong>Continue as Company →</strong>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "35px" }}>
          <span style={{ color: "#aeb4c0" }}>
            Already have an account?{" "}
          </span>

          <button
            onClick={() => navigate("/login")}
            style={{
              background: "transparent",
              border: "none",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;