import { createContext, useState } from 'react';

export const LikeContext = createContext();

export function LikeContextProvider({ children }) {
    const [likes, setLikes] = useState(null);
    const value = { likes, setLikes };
    return (
        <LikeContext.Provider value={value}>{children}</LikeContext.Provider>
    );
}
