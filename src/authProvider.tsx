import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type AuthContextType = {
    token: string | null;
    setToken: (newToken: string) => void;
    };


const AuthContext = createContext<AuthContextType>({
    token: null,
    setToken: (newToken: string) => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // State to hold the authentication token
  const [token, setToken_] = useState(localStorage.getItem("token"));

  // Function to set the authentication token
  const setToken = (newToken: string) => {
    setToken_(newToken);
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem('token',token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem('token')
    }
  }, [token]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;