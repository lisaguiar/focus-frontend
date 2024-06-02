import { getChecklists } from "@/api/checklist"
import { getFrame } from "@/api/frame"
import { getKanbanColumns, getKanbanCards } from "@/api/kanban"
import { getNotes } from "@/api/note"
import { ActionChecklist } from "@/components/form/checklist/action-checklist"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Cross1Icon, DotsVerticalIcon, PlusIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Checklist, Frame, KanbanCard, KanbanColumn, Note } from "@/lib/types"

export const FramePage = () => {
    const pathname = window.location.pathname
    const frame_id = Number(pathname.split('/')[7])
    const navigate = useNavigate()
    
    const [frame, setFrame] = useState<Frame | null>(null)
    const [kanbanColumns, setKanbanColumns] = useState<KanbanColumn[]>([])
    const [kanbanCards, setKanbanCards] = useState<{ [key: number]: KanbanCard[] }>({})
    const [checklist, setChecklist] = useState<Checklist[]>([])
    const [note, setNote] = useState<Note[]>([])

    useEffect(() => { 
        const fetchFrame = async () => {
            try {
                if (frame_id) {
                    const frameData = await getFrame(Number(frame_id))
                    setFrame(frameData)

                    if (frameData.model_id === 1) {
                        const columnsData = await getKanbanColumns(frame_id)
                        setKanbanColumns(columnsData)

                        const cardsData = await getKanbanCards(frame_id)
                        setKanbanCards(cardsData)
                    } else if (frameData.model_id === 2) {
                        const checklistData = await getChecklists(frame_id)
                        setChecklist(checklistData)
                    } else if (frameData.model_id === 3) {
                        const noteData = await getNotes(frame_id)
                        setNote(noteData)
                    }
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchFrame()
    }, [frame_id])

    const renderFrameContent = () => {
        if (frame!.model_id === 1) {
            return (
                <>
                    <p className="font-bold text-lg pt-8">Kanban</p>
                    <div className="py-2 grid gap-6 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
                            {kanbanColumns && kanbanColumns.map((column) => (
                                <Card key={column.kanbancolumn_id}>
                                    <CardHeader>
                                        <CardTitle className="flex justify-between">
                                            {column.title}
                                            <div className="relative">
                                                <ActionChecklist operation="delete" />
                                                <Cross1Icon />
                                            </div>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-5">
                                        {kanbanCards && kanbanCards[column.kanbancolumn_id].map((card) => (
                                            <Card key={card.kanbancard_id} className="relative">
                                                <ActionChecklist operation="update" />
                                                <CardHeader className="px-6 pt-6 pb-2">
                                                    <p className="text-md font-semibold">{card.title}</p>
                                                </CardHeader>
                                                <CardContent className="text-sm">
                                                    <p>{card.description}</p>
                                                    {card.deadline ? (format(card.deadline, "PPP")) : null}
                                                </CardContent>
                                            </Card>
                                        ))}
                                        <Card className="flex justify-center items-center h-6 relative">
                                            <ActionChecklist operation="create" />
                                            <PlusIcon />
                                        </Card>
                                    </CardContent>
                                </Card>
                            ))}
                    </div>
                </>
            )
        } else if (frame!.model_id === 2) {
            return (
                <>
                    <p className="font-bold text-lg pt-8">Checklist</p>
                    <div className="py-2 grid gap-3 grid-cols-1">
                        {checklist.map((item) => (
                            <div key={item.checklist_id}>
                                <div className="flex items-center justify-between rounded-md bg-white p-3 px-6 border-2 relative">
                                    <ActionChecklist operation="update" values={{
                                        frame_id: frame_id,
                                        checklist_id: item.checklist_id,
                                        userdesktop_id: item.userdesktop_id,
                                        priority_id: item.priority_id,
                                        title: item.title,
                                        description: item.description,
                                        deadline: item.deadline,
                                        marked: item.marked
                                    }} />
                                    <div className="">
                                        <Checkbox checked={item.marked} />
                                    </div>
                                    <div className="">
                                        {item.title}
                                    </div>
                                    <p className="font-medium">{item.description}</p>
                                    <div className="relative">
                                        <ActionChecklist operation="delete" />
                                        <Cross1Icon />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-center items-center h-6 relative rounded-md bg-white">
                            <ActionChecklist operation="create" />
                            <PlusIcon />
                        </div>
                    </div>
                </>
            )
        } else if (frame!.model_id === 3) {
            return (
                <>
                    <p className="font-bold text-lg pt-8">Anotações</p>
                    <div className="py-2 grid gap-6 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
                        {note.map((item) => (
                            <Card key={item.note_id}>
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <CardTitle>{item.title}</CardTitle>
                                        <div className="relative flex">
                                            <ActionChecklist />
                                            <Cross1Icon />
                                        </div>
                                    </div>
                                    
                                </CardHeader>
                                <CardContent>
                                    <p>{item.content.length > 100 ? item.content.slice(0, 150) + "..." : item.content}</p>
                                </CardContent>
                            </Card>
                        ))}
                        <div className="flex justify-center items-center relative rounded-md border-2 h-full bg-white">
                            <ActionChecklist operation="create" />
                            <PlusIcon />
                        </div>
                    </div>
                </>
            )   
        }
    }

    const FrameMap = () => {
        return (
            <div className="px-4 py-2">
                {/* Renderize aqui outros conteúdos se model_id for diferente de 1 */}
                <div className="relative h-32 flex gap-6" key={frame?.frame_id}>
                    <div className="h-20 w-20 bg-primary border-gray-2 text-destructive-foreground rounded-md flex justify-center items-center">
                        <p className="text-5xl font-light">A</p>
                    </div>
                    <div>
                        <p className="font-bold text-xl">{frame?.title}</p>
                        <p className="font-light text-lg">{frame?.description}</p>
                    </div>
                    <div className="absolute right-0">
                        <DotsVerticalIcon />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-wrap justify-center">
            <div className="w-[85%] min-h-full my-3 mx-2">
                <div className="mt-6 px-4 py-2 text-md font-bold">
                    <FrameMap />
                    <Separator />
                    <div className="">
                        {renderFrameContent()}
                    </div>
                </div>
            </div>
        </div>
    )
}
