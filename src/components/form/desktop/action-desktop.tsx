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
            <div onClick={toggleDesktopForm} className="absolute flex items-center justify-center h-full w-full">     
            </div>

            {isDesktopFormVisible && <FormDesktop onClose={closeDesktopForm} operation={operation} />}
        </>
    )
}