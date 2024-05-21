import axios from "@/api/config/axios";
import React, { createContext, useContext, useEffect, useState } from "react";

interface ContextProps {
    user: UserProps | null
    signup: (values: { username: string; email: string; password: string }) => Promise<any>
    signin: (values: { email: string, password: string }) => Promise<any>
    logout: () => Promise<any>
}

interface UserProps {
    user_id: number | null
    username: string | null
    email: string | null
}

interface ProviderProps {
    children: React.ReactNode
}

const UserContext = createContext<ContextProps>({ 
    user: null,
    signup: async () => {},
    signin: async () => {}, 
    logout: async () => {} 
})

export const UserProvider: React.FC<ProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserProps | null>(() => {
        const storedUser = localStorage.getItem("user")
        return storedUser ? JSON.parse(storedUser) : null
    })

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user))
    }, [user])

    const signup = async (values: { username: string, email: string, password: string }) => {
        try {
            await axios.post(`/auth/signup`, values)
    
            const { username, ...other} = values
            const user_id: number = await signin(other)
            return user_id
        } catch (error: any) {
            console.log(error)
        }
    }

    const signin = async (values: { email: string, password: string }) => {
        try {
            const results = await axios.post<UserProps>(`/auth/signin`, values)
            setUser(() => {
                return results ? results.data : null
            })
            return results.data.user_id
        } catch (error: any) {
            return error.response.error
            //context error
        }
    }

    const logout = async () => {
        try {
            await axios.post(`/auth/logout`)
            setUser(null)
        } catch (error) {
            //context error
        }
    }

    return (
        <UserContext.Provider value={{ user, signup, signin, logout }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)