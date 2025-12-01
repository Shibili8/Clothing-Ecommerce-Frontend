import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      // IMPORTANT: Pass withCredentials so JWT cookie gets stored
      await api.post(
        "/auth/login",
        { email, password },
        { withCredentials: true }
      );

      // Mark user as logged in
      localStorage.setItem("auth", "true");
      console.log("Logged")
      navigate("/");
    } catch (err) {
      console.log("Login error:", err.response?.data);
      alert("Invalid credentials!");
    }
  };

  const guestLogin = () => {
    localStorage.setItem("auth", "guest");
    navigate("/");
  };

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      <input
        className="border p-3 w-full mb-3 rounded"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="border p-3 w-full mb-3 rounded"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="w-full bg-gray-900 text-white py-3 rounded"
        onClick={login}
      >
        Login
      </button>

      <button
        className="w-full bg-gray-700 text-white py-3 rounded mt-3"
        onClick={guestLogin}
      >
        Continue as Guest
      </button>

      <Link to="/forgot-password" className="block mt-3 text-blue-600">
        Forgot Password?
      </Link>

      <p className="mt-3">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-600">
          Register
        </Link>
      </p>
    </div>
  );
}
