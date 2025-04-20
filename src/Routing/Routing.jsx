import { Route, Routes } from "react-router";
import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import AppraisalForm from "../pages/AppraisalForm.jsx";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/appraisals"
        element={
          <ProtectedRoute allowedRoles={["Employee"]}>
            <AppraisalForm />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default Routing;
