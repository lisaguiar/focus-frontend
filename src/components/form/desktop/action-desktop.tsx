import { useState } from "react"
import { FormDesktop } from "./desktop"

interface FormDesktop {
    operation: string 
    values?: {
        desktop_id: number
        title: string
        description: string
    }
}

export const ActionDesktop: React.FC<FormDesktop> = ({ operation, values }) => {
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

            {isDesktopFormVisible && <FormDesktop onClose={closeDesktopForm} operation={operation} values={values} />}
        </>
    )
}