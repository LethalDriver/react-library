import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { api } from "./api";
import { UserDetails } from "../types/authTypes";

type AuthContextType = {
  user: UserDetails | null;
  setUser: (newUser: UserDetails | null) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {
    throw new Error("setUser function must be overridden");
  },
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserDetails | null>(null);

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
