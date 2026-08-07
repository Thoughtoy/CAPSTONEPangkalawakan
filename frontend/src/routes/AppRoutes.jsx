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

// Company
import CompanyDashboard from "../pages/company/CompanyDashboard";

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


        {/* =========================================
            COMPANY
        ========================================= */}

        <Route
          path="/company/dashboard"
          element={<CompanyDashboard />}
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