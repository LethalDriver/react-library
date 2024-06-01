import api from "./api";
import { createContext, useContext } from "react";

const ApiContext = createContext(api);

export const ApiProvider = ({ children }: { children: React.ReactNode }) => {
  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};

export const useApi = () => useContext(ApiContext);
