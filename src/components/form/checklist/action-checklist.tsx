import { useState } from "react"
import { FormChecklist } from "./checklist" // Certifique-se de que o caminho está correto

interface ActionChecklistProps {
    operation: string
    values?: {
        frame_id: number
        checklist_id: number
        userdesktop_id: number
        priority_id: number
        title: string
        description: string
        deadline: Date
        marked: boolean
    }
}

export const ActionChecklist: React.FC<ActionChecklistProps> = ({ operation, values }) => {
    const [isChecklistFormVisible, setChecklistFormVisible] = useState(false)

    const toggleChecklistForm = () => {
        setChecklistFormVisible(!isChecklistFormVisible)
    }

    const closeChecklistForm = () => {
        setChecklistFormVisible(false)
    }

    return (
        <>
            <div onClick={toggleChecklistForm} className="absolute flex items-center justify-center h-full w-full hover:cursor-pointer">
            </div>

            {isChecklistFormVisible && (
                <FormChecklist onClose={closeChecklistForm} operation={operation} values={values} />
            )}
        </>
    )
}