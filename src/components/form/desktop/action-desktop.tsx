import { useState } from "react"
import { FormDesktop } from "./desktop"

export const ActionDesktop = ({operation} : {operation: string}) => {
    const [isDesktopFormVisible, setDesktopFormVisible] = useState(false)
    
    const toggleDesktopForm = () => {
        setDesktopFormVisible(!isDesktopFormVisible)
    }

    const closeDesktopForm = () => {
        setDesktopFormVisible(false)
    }

    return (
        <>
            <div onClick={toggleDesktopForm} className="flex items-center justify-center rounded-full h-full w-full bg-red-400">     
            </div>

            {isDesktopFormVisible && <FormDesktop onClose={closeDesktopForm} operation={operation} />}
        </>
    )
}