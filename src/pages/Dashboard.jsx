import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import DashboardCard from "../components/DashbordCard.jsx";

const Dashboard = () => {
  const { auth, logout } = useContext(AuthContext);
  const { user } = auth;
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const role = user?.role;
  console.log("User object:", user); // gives undefined  on console
  console.log("User role:", user?.role); // gives undefined on console
  console.log("User role:", role); /// outpur is undefined on console

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="flex flex-col gap-4 p-4 border sm:grid-cols-2">
        {role === "Employee" && (
          <div>
            <DashboardCard
              title="Create Appraisal"
              onClick={() => navigate("/appraisals")}
              role={role}
            />
            <DashboardCard
              title="View My Appraisals"
              onClick={() => navigate("/my-appraisals")}
              role={role}
            />
          </div>
        )}

        {role === "Manager" && (
          <>
            <DashboardCard
              title="Review Appraisals"
              onClick={() => navigate("/manager")}
              role={role}
            />
            <DashboardCard
              title="Final Approvals"
              onClick={() => navigate("/manager/final")}
              role={role}
            />
          </>
        )}

        {role === "Supervisor" && (
          <DashboardCard
            title="Request Feedback"
            onClick={() => navigate("/supervisor")}
            role={role}
          />
        )}

        {(role === "Peer" || role === "Junior") && (
          <DashboardCard
            title="Submit Feedback"
            onClick={() => navigate("/feedback")}
            role={role}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
