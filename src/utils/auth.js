export const isAuthenticated = () => {
  return localStorage.getItem("auth"); // can be "true", "guest", or null
};

export const isLoggedInUser = () => {
  return localStorage.getItem("auth") === "true";  // ONLY true for real user
};
