import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// Public pages
import Home from "../pages/Home";

// Auth pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import GraduateRegister from "../pages/auth/GraduateRegister";
import CompanyRegister from "../pages/auth/CompanyRegister";
import ForgotPassword from "../pages/auth/ForgotPassword";

// Graduate
import GraduateDashboard from "../pages/graduate/GraduateDashboard";
import GraduateProfile from "../pages/graduate/Profile";
import GraduateInternships from "../pages/graduate/Internships";  
import GraduateApplications from "../pages/graduate/Applications";
import GraduateSkills from "../pages/graduate/Skills";
import GraduateRecommendations from "../pages/graduate/Recommendations";

// Company
import CompanyDashboard from "../pages/company/CompanyDashboard";
import CreateInternship from "../pages/company/CreateInternship";
import MyInternships from "../pages/company/MyInternships";
import CompanyApplicants from "../pages/company/CompanyApplicants";
import CompanyProfile from "../pages/company/CompanyProfile";

// Admin / PESO
import AdminDashboard from "../pages/admin/AdminDashboard";
import PendingCompanies from "../pages/admin/PendingCompanies";
import AdminCompanyReview from "../pages/admin/AdminCompanyReview";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================================
            PUBLIC
        ========================================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/register/graduate"
          element={<GraduateRegister />}
        />

        <Route
          path="/register/company"
          element={<CompanyRegister />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />


        {/* =========================================
            GRADUATE
        ========================================= */}

        <Route
          path="/graduate/dashboard"
          element={<GraduateDashboard />}
        />
        <Route
          path="/graduate/profile"
          element={<GraduateProfile />}
        />
        <Route
          path="/graduate/internships"
          element={<GraduateInternships />}
        />
        <Route
          path="/graduate/skills"
          element={<GraduateSkills />}
        />
        <Route
          path="/graduate/applications"
          element={<GraduateApplications />}
        />
        <Route
          path="/graduate/recommendations"
          element={<GraduateRecommendations />}
        />


        {/* =========================================
            COMPANY
        ========================================= */}

<Route
  path="/company/dashboard"
  element={<CompanyDashboard />}
/>

<Route
  path="/company/internships"
  element={<MyInternships />}
/>

<Route
  path="/company/internships/create"
  element={<CreateInternship />}
/>

<Route
  path="/company/applicants"
  element={<CompanyApplicants />}
/>
<Route
  path="/company/profile"
  element={<CompanyProfile />}
/>

        {/* =========================================
            PESO ADMIN
        ========================================= */}

        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/companies"
          element={<PendingCompanies />}
        />

        <Route
          path="/admin/companies/:id"
          element={<AdminCompanyReview />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;