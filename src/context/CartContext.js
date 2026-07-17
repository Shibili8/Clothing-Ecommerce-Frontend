import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { isAuthenticated } from "../utils/auth";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const loadCartCount = async () => {
    try {
      if (isAuthenticated() === "true") {
        const res = await api.get("/cart", { withCredentials: true });
        const count =
          res.data.items.length

        setCartCount(count);
      } else {
        const local = JSON.parse(localStorage.getItem("cart")) || [];
        const count = local.length;
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
