import { getDesktop } from "@/api/desktop"
import { getProjects } from "@/api/project"
import { ActionProject } from "@/components/form/project/action-project"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useUser } from "@/context/user"
import { Desktop, Project } from "@/lib/types"
import { DotsVerticalIcon, PlusIcon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react"
import { Dropdown } from "react-day-picker"
import { Link } from "react-router-dom"

export const DesktopPage = () => {
    const [desktop, setDesktop] = useState<Desktop>()
    const [project, setProject] = useState<Project[]>([])

    const { user } = useUser()
    const user_id = user!.user_id

    const pathname = window.location.pathname
    const desktop_id = Number(pathname.split('/')[3])

    async function dataDesktop () {
        const results = await getDesktop(user_id!)
        setDesktop(results)
    }

    async function dataProject () {
        const results = await getProjects(desktop_id)
        setProject(results)
    }

    useEffect(() => {
        dataDesktop()
        dataProject()
    }, [])

    const DesktopMap = () => {
        return (
            <>
                {desktop && 
                    <div className="relative h-32 flex gap-6">
                        <div className="h-16 w-16 bg-primary border-gray-2 text-destructive-foreground rounded-md flex justify-center items-center">
                            <p className="text-3xl font-light">{desktop.title.charAt(0).toUpperCase()}</p>
                        </div>
                        <div>
                            <p className="font-bold text-xl">{desktop.title}</p>
                            <p className="font-light text-lg">{desktop.description}</p>
                        </div>
                        <div className="absolute right-0">
                            <Popover>
                                <PopoverTrigger>
                                    <DotsVerticalIcon width={20} height={20} />
                                </PopoverTrigger>
                                <PopoverContent align={"end"}>
                                    <p className="font-bold">Área de trabalho</p>
                                    <Separator className="my-1"/>
                                    <div className="mt-2 space-y-1">
                                        <div className="hover: cursor-pointer">
                                            Editar área de trabalho
                                        </div>
                                        <div className="hover: cursor-pointer">
                                            Excluir área de trabalho
                                        </div>
                                    </div>
                                    
                                </PopoverContent>
                            </Popover>
                            
                        </div>  
                    </div>
                }
            </>
        )
    }

    const ProjectsMap = () => {
        return (
            <div className="py-2">
                {project.length && 
                    <>
                        <p className="font-bold text-lg">Projetos</p>
                        <div className="mt-4 py-2 grid gap-6 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
                            {project.map((project) => {
                                return (
                                    <div className="px-4 py-2 bg-secondary-foreground rounded-md h-36 hover:cursor-pointer hover:bg-secondary-foreground/75 transition-all duration-500" key={project.project_id}>
                                        <Link to={`${pathname}/p/${project.project_id}`}>
                                                <p className="text-muted">{project.title}</p> 
                                        </Link>
                                    </div>
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
            <div className="flex justify-between w-[97%] min-h-full my-3 mx-2 mt-6 px-4 py-2 text-md font-bold">
                <div className="w-[74%]">
                    <DesktopMap />
                    <Tabs defaultValue="project" className="w-full">
                        <TabsList className="flex items-center justify-center">
                            <TabsTrigger value="project">Projetos</TabsTrigger>
                            <TabsTrigger value="member">Membros</TabsTrigger>
                            <TabsTrigger value="favorite">Favoritos</TabsTrigger>
                            <TabsTrigger value="config">Configurações</TabsTrigger>
                        </TabsList>
                        <TabsContent value="project"><ProjectsMap /></TabsContent>
                        <TabsContent value="member">Membros.</TabsContent>
                        <TabsContent value="config">Configurações</TabsContent>
                    </Tabs>
                </div>
                <div className="w-[23%] min-h-full bg-muted rounded-lg">
                    oi
                </div>
            </div>
        </div>
    )
}