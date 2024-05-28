import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle 
} from "../../ui/card"
import { deleteKanbanCard, deleteKanbanColumn, postKanbanCard, postKanbanColumn, updateKanbanCard, updateKanbanColumn } from "@/api/kanban"
import { useUser } from "@/context/user"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "@radix-ui/react-icons"

interface FormKanbanProps {
    values?: {
        frame_id: number
        kanbancolumn_id?: number
        kanbancard_id?: number
        userdesktop_id?: number
        priority_id?: number
        title: string
        description?: string
        deadline?: Date
    }
    operation: string
    type: "column" | "card"
    onClose: () => void
}

export const FormKanban: React.FC<FormKanbanProps> = ({ onClose, operation, values, type }) => {
    const { user } = useUser()
    const user_id = user!.user_id!

    const handleLinkClick = () => {
        onClose()
    }

    const navigate = useNavigate()

    const formSchema = type === "column" ? z.object({
        title: z.string().min(1, { message: "Esse campo não pode estar vazio." }).max(50, { message: "Esse campo não pode ter mais que 50 caracteres." })
    }) : z.object({
        userdesktop_id: z.number(),
        priority_id: z.number().optional(),
        title: z.string().min(1, { message: "Esse campo não pode estar vazio." }).max(50, { message: "Esse campo não pode ter mais que 50 caracteres." }),
        description: z.string().min(1, { message: "Esse campo não pode estar vazio." }).max(250, { message: "Esse campo não pode ter mais que 250 caracteres." }).optional(),
        deadline: z.date().optional()
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userdesktop_id: values?.userdesktop_id ?? user_id,
            priority_id: values?.priority_id ?? 1,
            title: values?.title ?? "",
            description: values?.description ?? "",
            deadline: values?.deadline ?? new Date("2024-01-01")
        }
    })

    async function onSubmit(formValues: z.infer<typeof formSchema>) {
        try {
            if (type === "column") {
                if (operation === "create") {
                    await postKanbanColumn(values!.frame_id, formValues)
                } else if (operation === "update") {
                    await updateKanbanColumn(values!.kanbancolumn_id!, formValues)
                } else if (operation === "delete") {
                    await deleteKanbanColumn(values!.kanbancolumn_id!)
                }
            } else {
                if (operation === "create") {
                    await postKanbanCard(values!.kanbancolumn_id!, formValues)
                } else if (operation === "update") {
                    await updateKanbanCard(values!.kanbancard_id!, formValues)
                } else if (operation === "delete") {
                    await deleteKanbanCard(values!.kanbancard_id!)
                }
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="h-screen w-screen fixed top-0 left-0 z-20 bg-gray-900 bg-opacity-30">
            <div className="h-full flex items-center justify-center">
                <Card className="w-[450px] relative">
                    <CardHeader>
                        <CardTitle>
                            {operation === "create" && <>Criar {type === "column" ? "nova coluna" : "novo cartão"}</>}
                            {operation === "update" && <>Atualizar {type === "column" ? "coluna" : "cartão"}</>}
                            {operation === "delete" && <>Excluir {type === "column" ? "coluna" : "cartão"}</>}
                        </CardTitle>
                        <CardDescription>
                            {operation === "create" && <>Personalize e organize suas tarefas de forma rápida e fácil.</>}
                            {operation === "update" && <>Revise e atualize sua tarefa para manter tudo organizado.</>}
                            {operation === "delete" && <>Você tem certeza? Essa ação não pode ser desfeita.</>}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="grid w-full items-center gap-4">
                                {(operation === "create" || operation === "update") && (
                                    <>
                                        <FormField control={form.control} name="title" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nome</FormLabel>
                                                <FormControl>
                                                    <Input type="text" placeholder={`Nomeie ${type === "column" ? "sua coluna" : "seu cartão"}...`} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                        />
                                        {type === "card" && (
                                            <>
                                                <FormField control={form.control} name="description" render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Descrição</FormLabel>
                                                        <FormControl>
                                                            <Input type="text" placeholder="Descreva sua tarefa..." {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                                />
                                                <FormField control={form.control} name="priority_id" render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Prioridade</FormLabel>
                                                        <FormControl>
                                                            <Select>
                                                                <SelectTrigger id="priority_id" {...field}>
                                                                    <SelectValue placeholder="Selecione uma prioridade..." />
                                                                </SelectTrigger>
                                                                <SelectContent position="popper">
                                                                    <SelectItem value="1">Muito importante</SelectItem>
                                                                    <SelectItem value="2">Importante</SelectItem>
                                                                    <SelectItem value="3">Relevante</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                                />
                                                <FormField control={form.control} name="deadline" render={({ field }) => (
                                                    <FormItem className="flex justify-between items-center">
                                                        <FormLabel>Data de Entrega</FormLabel>
                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <FormControl>
                                                                    <Button variant={"outline"}>
                                                                        {field.value ? (format(field.value, "PPP")) : (<span>Escolha uma data...</span>)}
                                                                        <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                                                                    </Button>
                                                                </FormControl>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto p-0" align="start">
                                                                <Calendar
                                                                    mode="single"
                                                                    selected={field.value}
                                                                    onSelect={field.onChange}
                                                                    disabled={(date: Date) => date > new Date() || date < new Date("2024-01-01")}
                                                                    initialFocus
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                                />
                                            </>
                                        )}
                                    </>
                                )}
                                <div className="flex justify-between mt-4">
                                    <Button variant="outline" onClick={handleLinkClick}>Cancelar</Button>
                                    <Button type="submit">
                                        {operation === "create" && <>Cadastrar</>}
                                        {operation === "update" && <>Atualizar</>}
                                        {operation === "delete" && <>Excluir</>}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
