import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("dci_admin_token"));

  const login = (t) => {
    localStorage.setItem("dci_admin_token", t);
    setToken(t);
  };
  const logout = () => {
    localStorage.removeItem("dci_admin_token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, isAdmin: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);