import { useEffect, useState } from "react";
import api from "../services/api";
import { isAuthenticated } from "../utils/auth";
import { isLoggedInUser } from "../utils/auth";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const { loadCartCount } = useCart();

  useEffect(() => {
    loadCart();
  }, []);

  // Load Cart from server or localStorage
  const loadCart = async () => {
    if (isLoggedInUser()) {
      const res = await api.get("/cart", { withCredentials: true });
      setCart(res.data.items || []);
      console.log("CART RESPONSE:", res.data);

    } else {
      const localCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(localCart);
    }
  };

  // ================================
  // REMOVE ITEM
  // ================================
  const removeItem = async (item) => {
    if (isAuthenticated() === "true") {
      await api.delete("/cart/remove", {
        data: {
          productId: item.product,
          size: item.size,
        },
      });
      loadCartCount();
      loadCart();
    } else {
      const updated = cart.filter(
        (i) => !(i._id === item._id && i.size === item.size)
      );
      localStorage.setItem("cart", JSON.stringify(updated));
      setCart(updated);
      loadCartCount();

    }
  };

  // ================================
  // INCREASE QTY
  // ================================
  const increaseQty = async (id) => {
    const item = cart.find((i) => i._id === id);
    const newQty = item.qty + 1;

    if (isAuthenticated() === "true") {
      await api.put("/cart/update", {
        productId: item.product,
        size: item.size,
        qty: newQty,
      });
      loadCartCount();
      loadCart();
    } else {
      const updated = cart.map((i) =>
        i._id === id ? { ...i, qty: newQty } : i
      );
      localStorage.setItem("cart", JSON.stringify(updated));
      setCart(updated);
      loadCartCount();

    }
  };

  // ================================
  // DECREASE QTY (delete if qty=0)
  // ================================
  const decreaseQty = async (id) => {
    const item = cart.find((i) => i._id === id);
    const newQty = item.qty - 1;

    if (newQty === 0) {
      return removeItem(item); 
      loadCartCount();
// Auto delete
    }

    if (isAuthenticated() === "true") {
      await api.put("/cart/update", {
        productId: item.product,
        size: item.size,
        qty: newQty,
      });
      loadCart();
      loadCartCount();

    } else {
      const updated = cart.map((i) =>
        i._id === id ? { ...i, qty: newQty } : i
      );
      localStorage.setItem("cart", JSON.stringify(updated));
      setCart(updated);
      loadCartCount();

    }
  };

  // Empty cart check
  if (cart.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600 text-lg font-medium">
          No products added to Cart.
        </p>
        <Link
          to="/products"
          className="inline-block mt-4 bg-gray-900 text-white px-6 py-3 rounded"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  // Calculate totals
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const totalItems = cart.length

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      {/* CART LIST */}
      {cart.map((item) => (
  <div key={item._id} className="p-4 border rounded mb-4">

    {/* TOP SECTION — ONLY IMAGE + DETAILS + REMOVE */}
    <div className="flex items-center justify-between gap-4">

      {/* IMAGE */}
      <img
        src={item.image}
        className="w-20 h-20 object-cover rounded"
        alt=""
      />

      {/* DETAILS — COLUMN LAYOUT */}
      <div className="flex flex-col flex-1">
        <h3 className="font-semibold text-lg">{item.name}</h3>
        <p className="text-gray-600 text-sm">Size: {item.size}</p>
        <p className="font-semibold text-gray-900">₹{item.price}</p>
      </div>

      {/* REMOVE BUTTON */}
      <button
        onClick={() => removeItem(item)}
        className="text-red-500 text-xl font-bold px-3"
      >
        ×
      </button>
    </div>

    {/* BOTTOM SECTION — ONLY QUANTITY CONTROLS */}
    <div className="flex items-center gap-3 mt-4">
        <p>Quantity:</p>
      <button
        onClick={() => decreaseQty(item._id)}
        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full text-lg"
      >
        –
      </button>

      <span className="w-10 text-center font-semibold">{item.qty}</span>

      <button
        onClick={() => increaseQty(item._id)}
        className="w-8 h-8 flex items-center justify-center bg-gray-900 text-white rounded-full text-lg"
      >
        +
      </button>

    </div>

  </div>
))}


      {/* SUMMARY BOX */}
      <div className="flex justify-end mt-8">
        <div className="w-full md:w-80 p-5 border rounded-lg bg-gray-100 shadow-sm">

          <h3 className="text-xl font-bold mb-4 text-gray-900">Order Summary</h3>

          <div className="flex justify-between text-gray-700 mb-2">
            <span>Total Items:</span>
            <span className="font-semibold">{totalItems}</span>
          </div>

          <div className="flex justify-between text-gray-700 mb-4">
            <span>Total Price:</span>
            <span className="font-semibold text-lg">₹{totalPrice}</span>
          </div>

          <Link
            to="/checkout"
            className="block bg-gray-900 text-white text-center py-3 rounded mt-4"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
