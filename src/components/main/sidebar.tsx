import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { FrameIcon, StarIcon, PersonIcon, GearIcon, BellIcon, HomeIcon } from "@radix-ui/react-icons"
import { Button } from "../ui/button"
import { useNavigate } from "react-router-dom"
import { Separator } from "../ui/separator"

export const Sidebar = () => {

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

    const navigate = useNavigate()

    const Items = () => {
        return (
            <>
                <Button className="w-full justify-start py-6 text-md font-bold" variant="ghost" onClick={() => navigate("#")}>
                    <div className="flex items-center gap-4">
                        <HomeIcon width={20} height={20} />
                        Início  
                    </div>
                    
                </Button>
                <Button className="w-full justify-start py-6 text-md font-bold" variant="ghost" onClick={() => navigate("#")}>
                    <div className="flex items-center gap-4">
                        <StarIcon width={20} height={20} />
                        Favoritos
                    </div>
                </Button>
                <Button className="w-full justify-start py-6 text-md font-bold" variant="ghost" onClick={() => navigate("#")}>
                    <div className="flex items-center gap-4">
                        <BellIcon width={18} height={18} />
                        Notificações
                    </div>
                    </Button>
                <div className="p-2">
                    <Separator />
                </div>
            </>
        )
    }

    //fazer mensagem "você ainda não possui nenhuma área de trabalho. crie agora -> botão"
    const DesktopMap = () => {
        return (
            <>
                <p className="px-4 py-2 text-muted-foreground text-sm font-regular">Áreas de trabalho</p>
                {data.map((desktop) => {
                    return (
                        <Accordion type="single" collapsible key={desktop.id}>
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="font-semibold text-md hover:bg-muted px-2 pl-4 py-3 rounded-md">
                                    <div className="flex justify-center items-center gap-2">
                                        <div className="h-9 w-9 rounded-md flex justify-center items-center bg-primary border-2 text-destructive-foreground">
                                            {desktop.title.charAt(0).toUpperCase()}
                                        </div>
                                        {desktop.title}
                                    </div>
                                    </AccordionTrigger>
                                <AccordionContent className="flex items-center gap-4 font-medium py-2 pl-8 rounded-md hover:bg-muted">
                                    <FrameIcon />
                                    Projetos
                                </AccordionContent>
                                {/*
                                <AccordionContent className="flex items-center gap-4 font-medium py-3 ml-4 rounded-md hover:bg-muted">
                                    <StarIcon />
                                    Favoritos
                                </AccordionContent>
                                */}
                                <AccordionContent className="flex items-center gap-4 font-medium py-2 pl-8 rounded-md hover:bg-muted">
                                    <PersonIcon />
                                    Membros
                                </AccordionContent>
                                <AccordionContent className="flex items-center gap-4 font-medium py-2 pl-8 rounded-md hover:bg-muted">
                                    <GearIcon />
                                    Configurações
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    )
                })}
            </>
        )
    }

    return (
        <div className="min-h-full px-4">
            <div className="py-4">
                <Items />
                <DesktopMap />
            </div>
        </div>
    )
}
