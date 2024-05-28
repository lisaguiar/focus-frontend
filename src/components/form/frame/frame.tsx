import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
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
import { deleteFrame, postFrame, updateFrame } from "@/api/frame"
import { useUser } from "@/context/user"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FormFrameProps {
    values?: {
        desktop_id: number
        project_id: number
        frame_id: number
        model_id: number
        title: string
        description: string
    }
    operation: string
    onClose: () => void
}

export const FormFrame: React.FC<FormFrameProps> = ({ onClose, operation, values }) => {
    const { user } = useUser()
    const user_id = user!.user_id!

    const handleLinkClick = () => {
        onClose()
    }

    const navigate = useNavigate()

    const formSchema = z.object({
        model_id: z.number().min(1, { message: "Esse campo não pode estar vazio." }),
        title: z
            .string()
            .min(1, { message: "Esse campo não pode estar vazio." })
            .max(50, { message: "Esse campo não pode ter mais que 50 caracteres." }),
        description: z
            .string()
            .min(1, { message: "Esse campo não pode estar vazio." })
            .max(250, { message: "Esse campo não pode ter mais que 250 caracteres." }),
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            model_id: values ? values.model_id : 0,
            title: values ? values.title : "",
            description: values ? values.description : ""
        }
    })

    async function onSubmit (formValues: z.infer<typeof formSchema>) {
        switch (operation) {
            case "create":
                try {
                    const frame_id = await postFrame(values!.project_id, formValues)
                    navigate(`/${user_id}/d/${values!.desktop_id}/p/${values!.project_id}/f/${frame_id}`)
                } catch (error) {
                    // error
                }
                break
            case "update":
                try {
                    await updateFrame(values!.frame_id, formValues)
                } catch (error) {
                    // error
                }
                break
            case "delete":
                try {
                    await deleteFrame(values!.frame_id)
                    navigate(`/${user_id}/d/${values!.desktop_id}/p/${values!.project_id}`)
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
                        {operation === "create" && <>Criar novo frame</>}
                        {operation === "update" && <>Atualizar frame</>}
                        {operation === "delete" && <>Excluir frame</>}
                        </CardTitle>
                    <CardDescription>
                        {operation === "create" && <>Personalize e organize seus frames de forma rápida e fácil.</>}
                        {operation === "update" && <>Revise e atualize seu frame para manter tudo organizado.</>}
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
                                                <Input type="text" placeholder="Nomeie seu frame..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    />
                                    <FormField control={form.control} name="description" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Descrição</FormLabel>
                                            <FormControl>
                                                <Input type="text" placeholder="Descreva seu frame..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    />
                                    <FormField control={form.control} name="description" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Modelo</FormLabel>
                                            <FormControl>
                                                <Select>
                                                    <SelectTrigger id="model_id" {...field}>
                                                        <SelectValue placeholder="Selecione um modelo de quadro..." />
                                                    </SelectTrigger>
                                                    <SelectContent position="popper">
                                                        <SelectItem value="1">Kanban</SelectItem>
                                                        <SelectItem value="2">Checklist</SelectItem>
                                                        <SelectItem value="3">Anotação</SelectItem>
                                                    </SelectContent>
                                                </Select>
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