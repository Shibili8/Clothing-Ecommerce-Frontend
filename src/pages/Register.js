import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate = useNavigate();

  const register = async () => {
    await api.post("/auth/register", { name, email, password });
    navigate("/");
  };

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h2 className="text-2xl font-bold">Register</h2>

      <input
        className="border p-3 w-full mb-3 rounded"
        placeholder="Full Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="border p-3 w-full mb-3 rounded"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="border p-3 w-full mb-3 rounded"
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="w-full bg-gray-900 text-white py-3 rounded"
        onClick={register}
      >
        Register
      </button>
      <p className="mt-3">
          Have already an account?{" "}
              <Link to="/login" className="text-blue-600">
                Login
              </Link>
      </p>
    </div>
  );
}
