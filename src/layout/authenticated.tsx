import { Loading } from "@/app/main/loading"
import { Navbar } from "@/components/root/navbar"
import { Sidebar } from "@/components/root/sidebar"
import { useAuth } from "@/context/auth"
import { useUser } from "@/context/user"
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

export const AuthenticatedLayout: React.FC = () => {
    const { authorized, authorizedUrl, loading, loadingUrl } = useAuth()
    const { user } = useUser()
    const navigate = useNavigate()

    useEffect(() => {
        if (!loading && !authorized) {
            navigate('/sign-in')
        }
        console.log(authorizedUrl)
        if (!loading && !loadingUrl && authorized && !authorizedUrl && user) {
            navigate(`/${user.user_id}/board`)
        }
    }, [loading, authorized, authorizedUrl])

    if (loading) {
        return (
            <Loading />
        )
    }
    if (authorized) {
        return (
            <>
                <div className="static h-full min-w-full bg-red-300">
                    <div className="fixed top-0 right-0 w-full h-navbar bg-white z-10">
                        <Navbar />
                    </div>
                    <div className="fixed top-16 left-2 w-sidebar h-outlet bg-white rounded-md z-0">
                        <Sidebar />
                    </div>
                    <div className="absolute top-16 right-5 w-outlet z-0">
                        <div className="bg-destructive-foreground border-2 rounded-md min-h-outlet">
                            <Outlet />
                        </div>
                        <div className="my-3" />
                    </div>
                </div>
            </>
        )
    }  
}