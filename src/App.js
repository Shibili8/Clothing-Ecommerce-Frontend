import { Routes, Route, Navigate } from "react-router-dom";

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
  // Read from localStorage on every render
  const auth = localStorage.getItem("auth"); // "true", "guest", or null
  const isAllowed = auth === "true" || auth === "guest";

  return (
    <div className="max-w-5xl mx-auto p-4">
      <Routes>
        {/* Home (guest + logged-in allowed) */}
        <Route
          path="/"
          element={isAllowed ? <Home /> : <Navigate to="/login" />}
        />

        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />

        {/* Cart allowed for all */}
        <Route path="/cart" element={<Cart />} />

        {/* Checkout (your own logic inside Checkout can block guests) */}
        <Route path="/checkout" element={<Checkout />} />

        {/* Order success only for real logged user */}
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
