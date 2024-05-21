import { useAuth } from "@/context/auth"
import { useUser } from "@/context/user"
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

export const UnauthenticatedLayout = () => {
    const { authorized, authorizedUrl, loading } = useAuth()
    const { user } = useUser()
    const navigate = useNavigate()

    useEffect(() => {
        if (!loading && authorized && user) {
            navigate(`/${user.user_id}/board`)
        }
    }, [loading, authorized, user])

    if (!authorized && !authorizedUrl) {
        return (
            <div>
                <Outlet />
            </div>
        )
    }
}