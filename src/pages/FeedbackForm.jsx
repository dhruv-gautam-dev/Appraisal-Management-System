import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const FeedbackForm = () => {
  const [appraisalId, setAppraisalId] = useState("");
  const [form, setForm] = useState({ comment: "", rating: "" });
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  console.log("id inside feedback form", appraisalId);
  console.log("token inside feedback form", token);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await axios.post(
        `http://localhost:5000/api/appraisals/${appraisalId}/feedback`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Feedback submitted successfully!");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      setMessage("Failed to submit feedback. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="w-full max-w-xl p-6 bg-white shadow-md rounded-xl">
        <h2 className="mb-4 text-2xl font-bold">Submit Feedback</h2>

        {message && (
          <div className="mb-4 font-medium text-green-600">{message}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Appraisal ID</label>
            <input
              type="text"
              value={appraisalId}
              onChange={(e) => setAppraisalId(e.target.value)}
              placeholder="Enter Appraisal ID"
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Rating (1-5)</label>
            <input
              type="number"
              name="rating"
              value={form.rating}
              onChange={handleChange}
              min="1"
              max="5"
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-1">Comment</label>
            <textarea
              name="comment"
              value={form.comment}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
