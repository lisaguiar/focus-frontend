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
import { deleteChecklist, postChecklist, updateChecklist } from "@/api/checklist"
import { useUser } from "@/context/user"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "@radix-ui/react-icons"

interface FormChecklistProps {
    values?: {
        frame_id: number
        checklist_id: number
        userdesktop_id: number
        priority_id: number
        title: string
        description: string
        deadline: Date
        marked: boolean
    }
    operation: string
    onClose: () => void
}

export const FormChecklist: React.FC<FormChecklistProps> = ({ onClose, operation, values }) => {
    const { user } = useUser()
    const user_id = user!.user_id!

    const handleLinkClick = () => {
        onClose()
    }

    const navigate = useNavigate()

    const formSchema = z.object({
        userdesktop_id: z
            .number(),
        priority_id: z
            .number(),
        title: z
            .string()
            .min(1, { message: "Esse campo não pode estar vazio." })
            .max(50, { message: "Esse campo não pode ter mais que 50 caracteres." }),
        description: z
            .string()
            .min(1, { message: "Esse campo não pode estar vazio." })
            .max(250, { message: "Esse campo não pode ter mais que 250 caracteres." }),
        deadline: z
            .date(),
        marked: z
            .boolean()
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userdesktop_id: values ? values.userdesktop_id : 0,
            priority_id: values ? values.priority_id : 1,
            title: values ? values.title : "",
            description: values ? values.description : "",
            deadline: values ? values.deadline : new Date("2024-01-01"),
            marked: values ? values.marked : false
        }
    })

    async function onSubmit (formValues: z.infer<typeof formSchema>) {
        switch (operation) {
            case "create":
                try {
                    const checklist_id = await postChecklist(values!.frame_id, formValues)
                    navigate(`/${user_id}/f/${values!.frame_id}/c/${checklist_id}`)
                } catch (error) {
                    // error
                }
                break
            case "update":
                try {
                    await updateChecklist(values!.checklist_id, formValues)
                } catch (error) {
                    // error
                }
                break
            case "delete":
                try {
                    await deleteChecklist(values!.checklist_id)
                    navigate(`/${user_id}/f/${values!.frame_id}`)
                } catch (error) {
                    // error
                }
            break
        } 
    }

    return (
        <div className="h-screen w-screen fixed top-0 left-0 z-20 bg-gray-900 bg-opacity-30">
            <div className="h-full flex items-center justify-center">
            <Card className="w-[450px] relative">
                <CardHeader>
                    <CardTitle>
                        {operation === "create" && <>Criar novo checklist</>}
                        {operation === "update" && <>Atualizar checklist</>}
                        {operation === "delete" && <>Excluir checklist</>}
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
                                                <Input type="text" placeholder="Nomeie sua tarefa..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    />
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
                                                <Select >
                                                    <SelectTrigger id="priority_id" {...field}>
                                                        <SelectValue defaultValue={field.value} placeholder="Selecione uma prioridade..." />
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
                                                                {field.value ? (format(field.value, "PPP")) : (<span>Defina um prazo</span>)}
                                                                <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            disabled={(date: Date) => date > new Date("2030-12-30") || date < new Date()}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    />
                                    <FormField control={form.control} name="marked" render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                            <FormLabel>Concluído?</FormLabel>
                                            <FormControl className="bg-muted">
                                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    />
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