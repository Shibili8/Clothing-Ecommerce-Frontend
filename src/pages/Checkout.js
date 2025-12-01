import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

import Navbar from "./components/Navbar";


export default function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  // Load checkout summary for both guest + logged user
  useEffect(() => {
    if (isAuthenticated() === "true") {
      loadServerCart();
    } else {
      loadGuestCart();
    }
  }, []);

  // 📌 1. Logged-in user → load from MongoDB
  const loadServerCart = async () => {
    try {
      const res = await api.get("/cart", { withCredentials: true });

      const items = res.data.items || [];
      setCart(items);

      setTotalItems(items.reduce((sum, i) => sum + i.qty, 0));
      setTotalPrice(items.reduce((sum, i) => sum + i.qty * i.price, 0));
    } catch (err) {
      console.log("Cart load error:", err.response?.data || err);
    }
  };

  // 📌 2. Guest user → load from localStorage
  const loadGuestCart = () => {
    const localCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(localCart);

    setTotalItems(localCart.reduce((sum, i) => sum + i.qty, 0));
    setTotalPrice(localCart.reduce((sum, i) => sum + i.qty * i.price, 0));
  };

  // 📌 3. Place order → only logged-in users
  const placeOrder = async () => {
    if (loading) return;

    // Guest user → redirect to login
    if (isAuthenticated() !== "true") {
      alert("Login required to place order!");
      return navigate("/login");
    }

    if (totalItems === 0) {
      alert("Your cart is empty. Add items first.");
      return;
    }

    try {
      setLoading(true);

      // Backend uses DB cart only
      const res = await api.post("/orders", {}, { withCredentials: true });

      navigate(`/order-success/${res.data._id}`);
    } catch (err) {
      const status = err.response?.status;
      const msg = err.response?.data?.message;

      if (status === 401) {
        alert("Session expired. Please login again.");
        return navigate("/login");
      }

      alert(msg || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
        <Navbar/>
    <div className="p-6 max-w-md mx-auto border rounded-lg shadow bg-gray-50">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>

      {/* ORDER SUMMARY */}
      <div className="border rounded p-4 bg-white shadow mb-6">
        <div className="flex justify-between text-gray-700 mb-2">
          <span>Total Items:</span>
          <span className="font-semibold">{totalItems}</span>
        </div>

        <div className="flex justify-between text-gray-700">
          <span>Total Price:</span>
          <span className="font-semibold text-lg">₹{totalPrice}</span>
        </div>
      </div>

      {/* BUTTON */}
      <button
        onClick={placeOrder}
        disabled={loading || totalItems === 0}
        className={`w-full py-3 rounded text-lg text-white transition-all
          ${
            loading || totalItems === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gray-900 hover:bg-black"
          }
        `}
      >
        {loading ? (
          <div className="flex items-center justify-center gap-3">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Processing...
          </div>
        ) : totalItems === 0 ? (
          "Cart is Empty"
        ) : (
          "Place Order"
        )}
      </button>
    </div>
    </>
  );
}
