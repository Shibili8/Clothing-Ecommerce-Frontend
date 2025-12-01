import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import api from "../services/api";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { cartCount, loadCartCount } = useCart();
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("auth") === "true";

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");   // Clear cookie
    } catch (err) {
      console.log("Logout error:", err);
    }

    localStorage.removeItem("auth");
    localStorage.removeItem("cart");

    loadCartCount();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow">
      <Link to="/" className="text-xl font-semibold">E-Commerce</Link>

      <button onClick={() => setOpen(!open)} className="text-xl md:hidden">
        ☰
      </button>

      <div
        className={`md:flex gap-6 text-sm absolute md:static left-0 top-14 
        w-full md:w-auto bg-gray-900 md:bg-transparent p-4 md:p-0 
        ${open ? "block" : "hidden"}`}
      >
        <Link className="block py-2" to="/products">Products</Link>

        <Link className="block py-2 relative" to="/cart">
          Cart
          {cartCount > 0 && (
            <span className="ml-2 bg-red-500 text-white px-2 py-0.5 text-xs rounded-full">
              {cartCount}
            </span>
          )}
        </Link>

        {isLoggedIn ? (
          <button onClick={handleLogout} className="block py-2 text-red-400">
            Logout
          </button>
        ) : (
          <Link className="block py-2" to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}
