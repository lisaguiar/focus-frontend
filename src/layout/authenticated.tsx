import { session, userData } from "@/api/auth"
import { Sidebar } from "@/components/root/sidebar"
import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"

export const AuthenticatedLayout = () => {
    const [authorized, setAuthorized] = useState<boolean>(true)
    const [user, setUser] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        validateSession()
        if (!authorized) {
            navigate(`/sign-in`)
        }
    }, [authorized])
    
    async function validateSession () {
        try {
            const results = await session()
            setAuthorized(results?.data.authorized || false)
            
            const data = userData()
            setUser(data)
        } catch (error) {
            setAuthorized(false)
            //mensagem = erro com o servidor. tente novamente
        }
    }

    return (
        <>
            {authorized && 
                <div className="flex flex-wrap">
                    <div className="w-sidebar min-h-screen">
                        <Sidebar />
                    </div>
                    <div className="w-outlet min-h-screen bg-red-500">
                        <Outlet />
                    </div>
                </div>}
        </>
    )
}