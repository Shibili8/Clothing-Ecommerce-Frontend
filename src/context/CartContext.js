import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { isAuthenticated } from "../utils/auth";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const loadCartCount = async () => {
    try {
      // LOGGED IN USER → fetch from backend
      if (isAuthenticated() === "true") {
        const res = await api.get("/cart", { withCredentials: true });

        const items = res.data.items || [];
        const count = items.reduce((sum, item) => sum + item.qty, 0);

        setCartCount(count);
      }

      // GUEST → use localStorage
      else {
        const local = JSON.parse(localStorage.getItem("cart")) || [];
        const count = local.reduce((sum, item) => sum + item.qty, 0);

        setCartCount(count);
      }
    } catch (err) {
      console.log("Cart count load error:", err);
    }
  };

  useEffect(() => {
    loadCartCount();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, loadCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
