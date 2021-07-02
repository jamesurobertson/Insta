import { createContext, useState } from "react";

export const ProfileContext = createContext();

export function ProfileContextProvider({ children }) {
  const [profileData, setProfileData] = useState(null);
  const value = { profileData, setProfileData };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}
