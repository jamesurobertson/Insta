import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({})
  const value = {
    currentUser,
    setCurrentUser
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
