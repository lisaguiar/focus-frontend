import { Link } from "react-router-dom"
import logo from "@/assets/app-logo.svg"
import { BellIcon } from "@radix-ui/react-icons"

export const Navbar = () => {
    const Logo = () => {
        return (
            <div className="flex items-center justify-center">
                <Link to="/">
                    <img src={logo} alt="Logotype" width={150} height={150} className="w-7 mx-2"/>
                </Link>
            </div>
        )
    }

    const Menu = () => {
        return (
            <div className="flex items-center justify-center gap-4">
                <BellIcon className="h-6 w-6" />
                <p>sair</p>
            </div>
        )
    }

    return (
        <div className="min-h-full min-w-full flex items-center justify-between space-x-10 px-6">
            <Logo />
            <Menu />
        </div>
    )
}