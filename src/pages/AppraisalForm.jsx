import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AppraisalForm = () => {
  const [form, setForm] = useState({
    communication: "",
    teamwork: "",
    problemSolving: "",
    workQuality: "",
    comments: "",
  });

  const [message, setMessage] = useState("");
  const { auth } = useContext(AuthContext);
  console.log("Auth context in AppraisalForm:", auth); // Check the auth context
  const token = auth.token;

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    console.log(token);

    try {
      await axios.post("http://localhost:5000/api/appraisals", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("Appraisal submitted successfully!");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      setMessage("Submission failed. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="w-full max-w-2xl p-6 bg-white shadow-md rounded-xl">
        <h2 className="mb-4 text-2xl font-bold">Self-Appraisal Form</h2>

        {message && (
          <div className="mb-4 font-medium text-blue-600">{message}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {["communication", "teamwork", "problemSolving", "workQuality"].map(
            (field) => (
              <div key={field}>
                <label className="block mb-1 capitalize">{field}</label>
                <input
                  type="number"
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  min="1"
                  max="5"
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            )
          )}

          <div>
            <label className="block mb-1">Additional Comments</label>
            <textarea
              name="comments"
              value={form.comments}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppraisalForm;
