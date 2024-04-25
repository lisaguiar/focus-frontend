import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { FrameIcon, StarIcon } from "@radix-ui/react-icons"

export const Sidebar = () => {
    return (
        <div className="px-4 rounded-lg">
            <div className="">
                <Accordion type="single" className="pl-2" collapsible>
                    <AccordionItem value="item-1" className="">
                        <AccordionTrigger className="font-bold">Área 1</AccordionTrigger>
                        <AccordionContent className="flex items-center gap-4 font-medium hover:bg-muted">
                            <FrameIcon />
                            Projetos
                        </AccordionContent>
                        <AccordionContent className="flex items-center gap-4 font-medium">
                            <StarIcon />
                            Favoritos
                        </AccordionContent>

                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    )
}
