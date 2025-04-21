import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ApprovalView = () => {
  const { auth } = useContext(AuthContext);
  const { user } = auth;
  const id = user.id;

  const [appraisals, setAppraisals] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // const fetchAppraisals = async () => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:5000/api/appraisals/68049c3c4747e18c6141ee2b`,
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  //     const userData = await response.json();
  //     console.log("User data:", userData);
  //     console.log(token);
  //     setAppraisals(response.data);
  //   } catch (err) {
  //     setMessage("Failed to fetch appraisals");
  //   }
  // };

  const fetchAppraisals = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/appraisals/${id}`
      );
      const data = response.data;
      console.log(data);
      if (Array.isArray(data)) {
        setAppraisals(data);
      } else {
        setMessage("Unexpected response format from server.");
      }
    } catch (err) {
      console.log(err.response?.data?.message || "Failed to load appraisals");
    }
  };
  const handleManagerReview = async (id) => {
    try {
      console.log("Manager review initiated for ID:", id);
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/appraisals/${id}/manager`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("Manager review successful");
      fetchAppraisals();
    } catch (err) {
      setMessage("Manager review failed");
    }
  };

  const handleSupervisorReview = async (id) => {
    try {
      console.log("Supervisor review initiated for ID:", id);
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/appraisals/${id}/supervisor`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("supervisor review successful");
      fetchAppraisals();
    } catch (err) {
      setMessage("supervisor review failed");
    }
  };

  // const handleAction = async (id, action) => {
  //   const urlMap = {
  //     manager: `/api/appraisals/${id}/manager`,
  //     supervisor: `/api/appraisals/${id}/supervisor`,
  //     approve: `/api/appraisals/${id}/approve`,
  //   };

  //   try {
  //     await axios.put(
  //       `http://localhost:5000${urlMap[action]}`,
  //       {},
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );
  //     setMessage("Action successful");
  //     fetchAppraisals();
  //   } catch (err) {
  //     setMessage("Action failed");
  //   }
  // };

  useEffect(() => {
    fetchAppraisals();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h2 className="mb-4 text-2xl font-bold">Approval Panel</h2>

      {message && (
        <div className="mb-4 font-medium text-blue-600">{message}</div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {appraisals.map((appraisal) => (
          <div
            key={appraisal._id}
            className="p-4 space-y-2 bg-white rounded-lg shadow"
          >
            <h3 className="font-semibold">
              Appraisal by: {appraisal.employeeName || "Employee"}
            </h3>
            <p>
              Status: <span className="font-medium">{appraisal.status}</span>
            </p>
            <p>Comments: {appraisal.comments}</p>

            <div className="flex flex-wrap gap-2 mt-2">
              {user.role === "Manager" && (
                <button
                  className="px-3 py-1 text-white bg-yellow-500 rounded"
                  onClick={() => handleManagerReview(appraisal._id)}
                >
                  Forward to Supervisor
                </button>
              )}
              {user.role === "Supervisor" && (
                <button
                  className="px-3 py-1 text-white bg-blue-600 rounded"
                  onClick={() => handleSupervisorReview(appraisal._id)}
                >
                  Request Feedback
                </button>
              )}
              {/* {user.role === "Manager" &&
                appraisal.status === "PendingFeedback" && (
                  <button
                    className="px-3 py-1 text-white bg-green-600 rounded"
                    onClick={() => handleAction(appraisal._id, "approve")}
                  >
                    Final Approval
                  </button>
                )} */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApprovalView;
