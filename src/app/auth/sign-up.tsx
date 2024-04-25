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
import { Separator } from "@/components/ui/separator"
import { signup } from "@/api/auth"
import { useNavigate } from "react-router-dom"

export const SignUp = () => {
    const navigate = useNavigate()

    const formSchema = z.object({
        username: z
            .string()
            .min(1, { message: "Esse campo não pode estar vazio." })
            .min(4, { message: "O nome de usuário precisa conter no mínimo 4 caracteres." })
            .max(50, { message: "O nome de usuário não pode ter mais que 50 caracteres." }),
        password: z
            .string()
            .min(1, { message: "Esse campo não pode estar vazio." })
            .min(8, { message: "Sua senha precisa conter no mínimo 8 caracteres." })
            .max(25),
        email: z
            .string()
            .min(1, { message: "Esse campo não pode estar vazio." })
            .email({ message: "Insira um email válido." })
            .max(150)
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: ""
        }
    })

    async function onSubmit (values: z.infer<typeof formSchema>) {
        try {
            await signup(values)
            navigate('/')
        } catch (error:any) {
            //erro
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white py-20 px-4 ">
            <div className="max-w-[22rem] w-full space-y-3">
                <div className="flex flex-col justify-center items-center">
                    <p className="w-full text-start text-md font-semibold text-gray-900">Comece agora!</p>
                    <p className="w-full text-start text-md font-medium text-gray-400">Crie sua conta no Focus</p>
                </div>
                <Separator />
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField control={form.control} name="username" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome de Usuário</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Insira seu nome de usuário..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="Insira seu endereço de email..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField control={form.control} name="password" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Senha</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Insira sua senha..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button className="w-full bg-purple" type="submit">Cadastrar</Button>
                    </form>
                </Form>        
            </div>
        </div>
    )
}