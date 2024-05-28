import { useState } from "react"
import { FormProject } from "./project"

interface FormProject {
    operation: string 
    values?: {
        desktop_id: number
        project_id: number
        title: string
        description: string
    }
}

export const ActionProject: React.FC<FormProject> = ({ operation, values }) => {
    const [isProjectFormVisible, setProjectFormVisible] = useState(false)
    
    const toggleProjectForm = () => {
        setProjectFormVisible(!isProjectFormVisible)
    }

    const closeProjectForm = () => {
        setProjectFormVisible(false)
    }

    return (
        <>
            <div onClick={toggleProjectForm} className="absolute flex items-center justify-center h-full w-full">     
            </div>

            {isProjectFormVisible && <FormProject onClose={closeProjectForm} operation={operation} values={values} />}
        </>
    )
}