import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { UserDetails } from "../types/authTypes";
import { useApi } from "./apiProvider";

type AuthContextType = {
  user: UserDetails | null;
  setUser: (newUser: UserDetails | null) => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {
    throw new Error("setUser function must be overridden");
  },
  loading: true,
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const api = useApi();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userInfo = await api.userInfo();
        setUser(userInfo);
      } catch (error) {
        console.error("Failed to fetch user info", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const contextValue = useMemo(
    () => ({ user, setUser, loading }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
