import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(localStorage.getItem("auth") || null);

  const login = () => {
    localStorage.setItem("auth", "true");
    setAuth("true");
  };

  const guestLogin = () => {
    localStorage.setItem("auth", "guest");
    setAuth("guest");
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, login, guestLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
