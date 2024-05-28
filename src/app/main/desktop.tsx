import { getDesktop } from "@/api/desktop"
import { getProjects } from "@/api/project"
import { ActionProject } from "@/components/form/project/action-project"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { DotsVerticalIcon, PlusIcon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

type Desktop = {
    desktop_id: number
    title: string
    description: string
}

type Project = {
    project_id: number
    title: string
    description: string
}

export const Desktop = () => {
    const [desktop, setDesktop] = useState<Desktop>()
    const [project, setProject] = useState<Project[]>([])

    const pathname = window.location.pathname

    async function dataDesktop () {
        try {
            const results = await getDesktop(1)
            setDesktop(results)
        } catch (error) {
            console.log(error)
        }
    }

    async function dataProject () {
        try {
            const results = await getProjects(1)
            setProject(results)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        dataDesktop()
        dataProject()
    }, [])

    const DesktopMap = () => {
        return (
            <div className="px-4 py-2">
                {desktop && 
                    <div className="relative h-32 flex gap-6" key={desktop.desktop_id}>
                        <div className="h-20 w-20 bg-primary border-gray-2 text-destructive-foreground rounded-md flex justify-center items-center">
                            <p className="text-5xl font-light">A</p>
                        </div>
                        <div>
                            <p className="font-bold text-xl">{desktop.title}</p>
                            <p className="font-light text-lg">{desktop.description}</p>
                        </div>
                        <div className="absolute right-0">
                            <DotsVerticalIcon />
                        </div>  
                    </div>
                }
            </div>
        )
    }

    const ProjectsMap = () => {
        return (
            <div className="px-4 py-2 mt-6">
                {project.length && 
                    <>
                        <p className="font-bold text-lg">Projetos</p>
                        <div className="mt-4 py-2 grid gap-6 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
                            {project.map((project) => {
                                return (
                                    <>
                                        <Link to={`${pathname}/p/${project.project_id}`}>
                                            <div className="px-4 py-2 bg-secondary-foreground rounded-md h-36 hover:cursor-pointer hover:bg-secondary-foreground/75 transition-all duration-500" key={project.project_id}>
                                                <p className="text-muted">{project.title}</p> 
                                            </div>
                                        </Link>
                                    </>
                                )
                            })}
                            <div className="relative flex justify-center items-center px-4 py-2 bg-secondary-foreground rounded-md hover:cursor-pointer hover:bg-secondary-foreground/85 transition-all duration-500">
                                <ActionProject operation="create" />
                                <PlusIcon color="white" /> 
                            </div>
                        </div>
                    </>
                }
                {!project.length && 
                    <div className="h-full py-2 font-medium flex justify-center items-center flex-col mt-20">
                        <p>Você ainda não possui nenhum projeto.</p>
                        <Button className="relative w-60 mt-4">
                            <ActionProject operation="create" />
                            <p>Adicionar novo projeto +</p>
                        </Button>
                    </div>
                }
                
                
            </div>
        )
    }

    return (
        <div className="flex flex-wrap justify-center">
            <div className="w-[85%] min-h-full my-3 mx-2">
                <div className="mt-6 px-4 py-2 text-md font-bold">
                    <DesktopMap />
                    <Separator />
                    <ProjectsMap />
                </div>
            </div>
        </div>
    )
}