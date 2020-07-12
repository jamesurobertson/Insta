import {createContext} from 'react'

export const UserContext = createContext({
    currentUserId: "",
    updateCurrentUser: ()=>{}


});

export const ProfileContext = createContext()

export const PostContext = createContext()
