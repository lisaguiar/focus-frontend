import { logout, session, userData } from "@/api/auth"
import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"

export const UnauthenticatedLayout = () => {
    const [authorized, setAuthorized] = useState<boolean>(false)
    const [user, setUser] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        validateSession()
        if (authorized) {
            navigate(`/${user?.id}/board`)
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
        <div>
            {!authorized && <Outlet />}
        </div>
    )
}