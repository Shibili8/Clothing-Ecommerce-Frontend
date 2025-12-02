import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import OrderSuccess from "./pages/OrderSuccess";
import RequireRealAuth from "./components/RequireAuth";

function App() {
  const [authState, setAuthState] = useState(localStorage.getItem("auth"));

  // Listen for login/logout changes
  useEffect(() => {
    const syncAuth = () => setAuthState(localStorage.getItem("auth"));
    window.addEventListener("storage", syncAuth);

    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  const isAllowed = authState === "true" || authState === "guest";

  return (
    <div className="max-w-5xl mx-auto p-4">
      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={isAllowed ? <Home /> : <Navigate to="/login" />}
        />

        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />

        {/* Cart allowed for all */}
        <Route path="/cart" element={<Cart />} />

        {/* Checkout only for logged users */}
        <Route path="/checkout" element={<Checkout />} />

        {/* Order success only for logged users */}
        <Route
          path="/order-success/:id"
          element={
            <RequireRealAuth>
              <OrderSuccess />
            </RequireRealAuth>
          }
        />

        {/* Auth pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
