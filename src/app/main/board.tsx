import { getDesktop, getDesktops } from "@/api/desktop"
import { ActionDesktop } from "@/components/form/desktop/action-desktop"
import { Separator } from "@/components/ui/separator"
import { useUser } from "@/context/user"
import { PlusIcon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

type Desktop = {
    desktop_id: number
    title: string
    description: string
    createdAt: string
    userdesktop_id: number
    permission_id: number
}

export const Board = () => {
    const { user } = useUser()

    const navigate = useNavigate()

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


    const DesktopMap = () => {
        return (
            <>
                <p className="mt-4 px-4 py-2 text-md font-bold">Suas Áreas de trabalho</p>
                <div className="px-4 py-2 grid gap-6 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
                    {data.map((desktop) => {
                        return (
                                <div onClick={() => navigate(`/${user.user_id}/d/${desktop.id}`)} className="px-4 py-2 bg-secondary-foreground rounded-md h-36 hover:cursor-pointer hover:bg-secondary-foreground/75 transition-all duration-500" key={desktop.id}>
                                    <p className="text-muted">{desktop.title}</p>
                                </div>
                        )
                    })}
                    <div className="relative flex justify-center items-center px-4 py-2 bg-secondary-foreground rounded-md hover:cursor-pointer hover:bg-secondary-foreground/85 transition-all duration-500">
                        <ActionDesktop operation="create" />
                        <PlusIcon color="white" />
                    </div>
                </div>
                
            </>
        )
    }

    const MemberDesktopMap = () => {
        return (
            <>
                <p className="mt-6 px-4 py-2 text-md font-bold">Áreas de trabalho do Convidado</p>
                <div className="px-4 py-2 grid gap-6 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
                    {data.map((desktop) => {
                        return (
                            <div className="px-4 py-2 bg-secondary-foreground rounded-md h-36 hover:cursor-pointer hover:bg-secondary-foreground/85 transition-all duration-500">
                                <p className="text-muted">{desktop.title}</p>
                            </div>
                        )
                    })}
                    <div className="relative flex justify-center items-center px-4 py-2 bg-secondary-foreground rounded-md hover:cursor-pointer hover:bg-secondary-foreground/85 transition-all duration-500">
                        <ActionDesktop operation="create" />
                        <PlusIcon color="white" />
                    </div>
                </div>
                
            </>
        )
    }

    const FavoritesMap = () => {
        return (
            <>
                <p className="mt-6 px-4 py-2 text-md font-bold">Favoritos</p>
                <div className="px-4 py-2 grid gap-6 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
                    {data.map((desktop) => {
                        return (
                            <div className="px-4 py-2 bg-secondary-foreground rounded-md h-36 hover:cursor-pointer hover:bg-secondary-foreground/85 transition-all duration-500">
                                <p className="text-muted">{desktop.title}</p>
                            </div>
                        )
                    })}
                    <div className="relative flex justify-center items-center px-4 py-2 bg-secondary-foreground rounded-md hover:cursor-pointer hover:bg-secondary-foreground/85 transition-all duration-500">
                        <ActionDesktop operation="create" />
                        <PlusIcon color="white" />
                    </div>
                </div>
                
            </>
        )
    }

    const Calendar = () => {
        return (
            <>
                <p className="mt-4 ml-4 px-4 py-2 text-md font-bold">Atividades recentes</p>
            </>
        )
    }

    return (
        <div className="flex flex-wrap justify-center">
            <div className="w-[70%] min-h-full my-3 mx-2">
                <FavoritesMap />
                <DesktopMap />
                <MemberDesktopMap />
            </div>
            
            <div className="flex w-[15%] my-3 mx-4 min-h-full">
            <Separator orientation="vertical" className="bg-white"/>
                <Calendar />
            </div>
        </div>
    )
}