import { createContext, useState } from 'react';

export const PostsContext = createContext();

export function PostsContextProvider({ children }) {
    const [posts, setPosts] = useState({});
    const [postOrder, setPostOrder] = useState(new Set());
    const value = { posts, setPosts, postOrder, setPostOrder };
    return (
        <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
    );
}
