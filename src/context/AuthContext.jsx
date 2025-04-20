import { children, createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: null,
    user: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const user = jwtDecode(token);
        setAuth({
          token,
          user,
          isAuthenticated: true,
        });
      } catch (error) {
        console.error("Invalid token:", error.message);
        localStorage.removeItem("token");
      }
    }
  }, []);

  const login = (token) => {
    const user = jwtDecode(token);
    console.log(localStorage);
    localStorage.setItem("token", token);
    setAuth({
      token,
      user,
      isAuthenticated: true,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({
      token: null,
      user: null,
      isAuthenticated: false,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
