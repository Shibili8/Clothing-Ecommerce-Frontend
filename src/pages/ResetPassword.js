import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function ResetPassword() {
  const { token } = useParams(); 
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!password.trim()) {
      return alert("Password cannot be empty");
    }

    try {
      setLoading(true);

      const res = await api.post(`/auth/reset-password/${token}`, {
        password,
      });

      alert("Password reset successful!");
      navigate("/login");
    } catch (err) {
      console.log("RESET ERROR:", err.response?.data);

      const msg = err.response?.data?.message;

      if (msg === "Invalid or expired token") {
        alert("Link expired or invalid. Please request a new reset link.");
        return navigate("/forgot-password");
      }

      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto mt-10 border rounded-lg shadow bg-white">
      <h2 className="text-xl font-bold mb-4 text-center">
        Reset Your Password
      </h2>

      <label className="block mb-2 font-medium">New Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 border rounded mb-4"
        placeholder="Enter new password"
      />

      <button
        onClick={handleReset}
        disabled={loading}
        className={`w-full py-3 rounded text-white text-lg ${
          loading ? "bg-gray-400" : "bg-gray-900 hover:bg-black"
        }`}
      >
        {loading ? (
          <div className="flex items-center justify-center gap-3">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Updating...
          </div>
        ) : (
          "Update Password"
        )}
      </button>
    </div>
  );
}
