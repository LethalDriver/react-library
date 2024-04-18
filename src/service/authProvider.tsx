import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { userDto, api } from "./httpService";

type AuthContextType = {
  user: userDto | null;
  setUser: (newUser: userDto) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: (newUser: userDto) => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser_] = useState<userDto | null>(null);

  const setUser = (newUser: userDto) => {
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
