import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const MyAppraisals = ({ employeeId: propEmployeeId }) => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [employeeId, setEmployeeId] = useState(null);
  const [appraisals, setAppraisals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Set employee ID when auth is ready or prop is provided
  useEffect(() => {
    if (propEmployeeId) {
      setEmployeeId(propEmployeeId);
    } else if (auth?.user?.id) {
      setEmployeeId(auth.user.id);
    }
  }, [auth, propEmployeeId]);

  useEffect(() => {
    if (!employeeId) return;

    const fetchAppraisals = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/appraisals/${employeeId}`
        );
        const data = response.data;
        console.log(data);
        if (Array.isArray(data)) {
          setAppraisals(data);
        } else {
          setError("Unexpected response format from server.");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load appraisals");
      } finally {
        setLoading(false);
      }
    };

    fetchAppraisals();
  }, [employeeId]);

  if (!employeeId)
    return (
      <p style={{ color: "red" }}>
        Employee ID not found. Please access this page via the dashboard.
      </p>
    );
  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="p-6">
      <h2 className="mb-4 text-2xl font-bold">Appraisals</h2>
      {appraisals.length === 0 ? (
        <p>No appraisals found.</p>
      ) : (
        <ul className="space-y-4">
          {appraisals.map((appraisal) => (
            <li
              key={appraisal._id}
              className="p-4 bg-white border rounded-lg shadow-sm"
            >
              <p>
                <strong>Created By:</strong> {appraisal.employeeName}
              </p>
              <p>
                <strong>Status:</strong> {appraisal.status}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(appraisal.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Manager Approval:</strong>{" "}
                {appraisal.managerApproval ? "Approved" : "Pending"}
              </p>
              <p>
                <strong>Supervisor Approval:</strong>{" "}
                {appraisal.supervisorApproval ? "Approved" : "Pending"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyAppraisals;
