import { getDesktop } from "@/api/desktop"
import { ActionDesktop } from "@/components/form/desktop/action-desktop"
import { Separator } from "@/components/ui/separator"
import { DotFilledIcon, DotsVerticalIcon, PlusIcon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react"

type Desktop = {
    desktop_id: number
    title: string
    description: string
}

export const Project = () => {

    const data = [
        {
            id: 1,
            title: "Desktop 1",
            description: "1"
        },
        {
            id: 2,
            title: "Desktop 2",
            description: "2"
        },
        {
            id: 3,
            title: "Desktop 3",
            description: "3"
        },
        {
            id: 4,
            title: "Desktop 4",
            description: "4"
        }
    ]

    const [desktop, setDesktop] = useState([])

    async function dataDesktop () {
        try {
            const results = await getProject(1)
            setProjec(results)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        dataDesktop()
    })

    const DesktopMap = () => {
        return (
            <div className="px-4 py-2">
                {desktop && desktop.map((desktop: Desktop) => {
                    return (
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
                    )
                })}
            </div>
        )
    }

    const ProjectsMap = () => {
        return (
            <div className="px-4 py-2 mt-6">
            <p className="font-bold text-lg">Projetos</p>
                <div className="mt-4 py-2 grid gap-6 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
                    {data.map((projet) => {
                        return (
                            <div className="px-4 py-2 bg-secondary-foreground rounded-md h-36 hover:cursor-pointer hover:bg-secondary-foreground/75 transition-all duration-500">
                                <p className="text-muted">{projet.title}</p>
                            </div>
                        )
                    })}
                    <div className="relative flex justify-center items-center px-4 py-2 bg-secondary-foreground rounded-md hover:cursor-pointer hover:bg-secondary-foreground/85 transition-all duration-500">
                        <ActionDesktop operation="create" />
                        <PlusIcon color="white" />
                    </div>
                </div>
                
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