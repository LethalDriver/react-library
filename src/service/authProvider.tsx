import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { api } from "./api";
import { userDetails } from "../types/authTypes";

type AuthContextType = {
  user: userDetails | null;
  setUser: (newUser: userDetails | null) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {
    throw new Error("setUser function must be overridden");
  },
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<userDetails | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await api.userInfo();
      setUser(userInfo);
    };

    fetchUser();
  }, []);

  const contextValue = useMemo(() => ({ user, setUser }), [user]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
