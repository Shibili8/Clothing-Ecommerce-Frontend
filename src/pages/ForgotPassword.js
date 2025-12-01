import { useState } from "react";
import api from "../services/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const send = async () => {
    const res = await api.post("/auth/forgot-password", { email });
    setMsg(res.data.message);
  };

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>

      <input
        className="border p-3 w-full mb-3 rounded"
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        className="w-full bg-gray-900 text-white py-3 rounded mt-3"
        onClick={send}
      >
        Send Reset Link
      </button>

      {msg && <p className="mt-4 text-green-600">{msg}</p>}
    </div>
  );
}
