import { useState } from "react"
import { FormFrame } from "./frame"

interface ActionFrameProps {
    operation: string
    values?: {
        desktop_id: number
        project_id: number
        frame_id: number
        model_id: number
        title: string
        description: string
    }
}

export const ActionFrame: React.FC<ActionFrameProps> = ({ operation, values }) => {
    const [isFrameFormVisible, setFrameFormVisible] = useState(false)
    
    const toggleFrameForm = () => {
        setFrameFormVisible(!isFrameFormVisible)
    }

    const closeFrameForm = () => {
        setFrameFormVisible(false)
    }

    return (
        <>
            <div onClick={toggleFrameForm} className="absolute flex items-center justify-center h-full w-full">     
            </div>

            {isFrameFormVisible && <FormFrame onClose={closeFrameForm} operation={operation} values={values} />}
        </>
    )
}