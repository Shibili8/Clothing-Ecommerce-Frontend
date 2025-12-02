export const isAuthenticated = () => {
  return localStorage.getItem("auth"); 
};

export const isLoggedInUser = () => {
  return localStorage.getItem("auth") === "true"; 
};
