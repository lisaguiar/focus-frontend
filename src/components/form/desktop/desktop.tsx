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
    CardTitle } from "../../ui/card"
import { postDesktop } from "@/api/desktop"

interface FormDesktopProps {
    operation: string
    onClose: () => void
}

export const FormDesktop: React.FC<FormDesktopProps> = ({ onClose, operation }) => {
    const user_id = JSON.parse(localStorage.getItem('user')).id

    const handleLinkClick = () => {
        onClose()
    }

    const navigate = useNavigate()

    const formSchema = z.object({
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
            title: "",
            description: ""
        }
    })

    async function onSubmit (values: z.infer<typeof formSchema>) {
        switch (operation) {
            case "create":
                try {
                    const desktop_id = await postDesktop(user_id, values)
                    navigate(`/${desktop_id}/desktop`)
                } catch (error) {
                    //error
                }
            break
            /*case "update":
                try {
                    const desktop_id = await updateDesktop(desktop_id, values)
                    navigate(`/${desktop_id}/desktop`)
                } catch (error) {
                    //error
                }
            break*/
            /*case "delete":
                try {
                    const desktop_id = await deleteDesktop(desktop_id)
                    navigate(`/${user_id}/board`)
                } catch (error) {
                    //error
                }
            break*/
        }
    }

    return (
        <div className="h-screen w-screen fixed top-0 left-0 z-20 bg-gray-900 bg-opacity-30">
            <div className="h-full flex items-center justify-center">
            <Card className="w-[450px] relative">
                <CardHeader>
                    <CardTitle>
                        {operation === "create" && <>Criar nova área de trabalho</>}
                        {operation === "update" && <>Atualizar área de trabalho</>}
                        {operation === "delete" && <>Excluir área de trabalho</>}
                        </CardTitle>
                    <CardDescription>
                        {operation === "create" && <>Personalize e organize seus projetos de forma rápida e fácil.</>}
                        {operation === "update" && <>Revise e atualize sua área de trabalho para manter seus projetos organizados.</>}
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
                                                <Input type="text" placeholder="Nomeie sua área de trabalho..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    />
                                    <FormField control={form.control} name="description" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Descrição</FormLabel>
                                            <FormControl>
                                                <Input type="text" placeholder="Descreva sua área de trabalho..." {...field} />
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