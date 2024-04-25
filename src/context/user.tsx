import { logout } from "@/api/auth";
import React, { createContext, useEffect, useState } from "react";

type User = {
    id: number
    username: string
    email: string
}
type UserProviderProps = {
    children: React.ReactNode
}

type UserContextType = {
    user: User[]
    setUser: React.Dispatch<React.SetStateAction<User[]>>
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User[]>([])

    useEffect(() => {
        const fetchData = async () => {
            if (!user || user === null) {
                await logout()
            }
        }
        fetchData()
    }, [user])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}