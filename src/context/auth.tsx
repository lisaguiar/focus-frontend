import { token, url } from "@/api/middleware"
import { createContext, useContext, useEffect, useState } from "react"
import { useUser } from "./user"

interface AuthProps {
    authorized: boolean
    authorizedUrl: boolean
    loading: boolean
    loadingUrl: boolean
}

interface ProviderProps {
    children: React.ReactNode
}

const AuthContext = createContext<AuthProps>({ authorized: false, authorizedUrl: false, loading: true, loadingUrl: true })

export const AuthProvider: React.FC<ProviderProps> = ({ children }) => {
    const [authorized, setAuthorized] = useState<boolean>(false)
    const [authorizedUrl, setAuthorizedUrl] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    const [loadingUrl, setLoadingUrl] = useState<boolean>(true)
    const { user, logout } = useUser()

    async function validateUrl () {
        try {
            if (user) {
                const results = await url(user.user_id) as { data: { authorized: boolean }}
                setAuthorizedUrl(results.data.authorized)
            } else {
                setAuthorizedUrl(false)
            }   
        } catch (error) {
            setAuthorizedUrl(false)
        } finally {
            setLoadingUrl(false)
        }
    }

    async function validateSession () {
        try {
            if (user) {
                const results = await token(user.user_id) as { data: { authorized: boolean }}
                setAuthorized(results.data.authorized)
            } else {
                setAuthorized(false)
            }
        } catch (error) {
            setAuthorized(false)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        validateSession()
    }, [user])

    useEffect(() => {
        if (!loading && !authorized) {
            logout()
        }
        if (loadingUrl && authorized) {
            validateUrl()
        }
    }, [loading, loadingUrl, authorized])

    return (
        <AuthContext.Provider value={{ authorized, authorizedUrl, loading, loadingUrl }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)