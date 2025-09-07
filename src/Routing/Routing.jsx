import { Route, Routes } from "react-router";
import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import AppraisalForm from "../pages/AppraisalForm.jsx";
import ApprovalView from "../pages/ApprovalView.jsx";
import MyAppraisals from "../pages/MyAppraisal.jsx";
import FeedbackForm from "../pages/FeedbackForm.jsx";

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
      <Route path="/my-appraisals" element={<MyAppraisals />} />
      <Route
        path="/manager"
        element={
          <ProtectedRoute allowedRoles={["Manager"]}>
            <ApprovalView />
          </ProtectedRoute>
        }
      />
      <Route
        path="/supervisor"
        element={
          <ProtectedRoute allowedRoles={["Supervisor"]}>
            <ApprovalView />
          </ProtectedRoute>
        }
      />

      <Route
        path="/feedback"
        element={
          <ProtectedRoute allowedRoles={["Peer", "Junior"]}>
            <FeedbackForm />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default Routing;
//final commit
