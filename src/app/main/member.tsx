import { getDesktop } from "@/api/desktop"
import { getMembers } from "@/api/member"
import { Separator } from "@/components/ui/separator"
import { DotsVerticalIcon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react"

type Desktop = {
    desktop_id: number
    title: string
    description: string
}

export const Member = () => {
    const [desktop, setDesktop] = useState([])
    const [members, setMembers] = useState([])

    async function dataDesktop () {
        try {
            const results = await getDesktop(1)
            setDesktop(results)
        } catch (error) {
            console.log(error)
        }
    }
    async function dataMembers () {
        try {
            const results = await getMembers(1)
            setMembers(results)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        dataDesktop()
        dataMembers()
    }, [])

    const DesktopMap = () => {
        return (
            <>
                {desktop && desktop.map((desktop: Desktop) => {
                    {console.log("a" + desktop)}
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
            </>
        )
    }

    const MemberMap = () => {
        return (
            <div>
                <div>
                    <p>Membros da Área de Trabalho ({members.length})</p>
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
                    <MemberMap />
                </div>
            </div>
        </div>
    )
}