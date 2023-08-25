import { useState, useEffect } from "react";
import AuthContext from "./auth-context";

const AuthProvider = (props) => {
  const storedToken = localStorage.getItem("token");
  const [token, setToken] = useState(storedToken);
  const userIsLoggedIn = !!token;

  const login = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
    setAutoLogout();
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    clearAutoLogout();
  };

  const setAutoLogout = () => {
    const autoLogoutTime = 5 * 60 * 1000; // 5 minutes in milliseconds
    setTimeout(() => {
      logout();
    }, autoLogoutTime);
  };

  const clearAutoLogout = () => {
    clearTimeout();
  };

  useEffect(() => {
    if (token) {
      setAutoLogout();
    }
  }, [token]);

  const authContextValue = {
    token: token,
    login: login,
    logout: logout,
    isLoggedIn: userIsLoggedIn,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
