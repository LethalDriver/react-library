import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "./httpService";
import { userDetails } from "../types/authTypes";

type AuthContextType = {
  user: userDetails | null;
  setUser: (newUser: userDetails) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: (newUser: userDetails) => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser_] = useState<userDetails | null>(null);

  const setUser = (newUser: userDetails) => {
    setUser_(newUser);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await api.userInfo();
      setUser_(userInfo);
    };

    fetchUser();
  }, []);

  const contextValue = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
