import { createContext, useState } from 'react';

export const FollowContext = createContext();

export function FollowContextProvider({ children }) {
    const [follows, setFollows] = useState({});
    const value = { follows, setFollows };
    return (
        <FollowContext.Provider value={value}>
            {children}
        </FollowContext.Provider>
    );
}
