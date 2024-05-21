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
import { useNavigate } from "react-router-dom"
import { useUser } from "@/context/user"

export const SignIn = () => {
    const { signin } = useUser()
    const navigate = useNavigate()

    const formSchema = z.object({
        email: z
            .string()
            .min(1, { message: "Esse campo não pode estar vazio." })
            .email({ message: "Insira um email válido." })
            .max(150),
        password: z
            .string()
            .min(1, { message: "Esse campo não pode estar vazio." })
            .max(25, { message: "Esse campo não pode ter mais que 25 caracteres." })
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    async function onSubmit (values: z.infer<typeof formSchema>) {
        try {
            const results: number = await signin(values)
            if (results) {
                navigate(`/${results}/board`)
            }
        } catch (error:any) {
            
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white py-20 px-4 ">
            <div className="max-w-[22rem] w-full space-y-3">
                <div className="flex flex-col justify-center items-center">
                    <p className="w-full text-start text-md font-semibold text-gray-900">Comece agora!</p>
                    <p className="w-full text-start text-md font-medium text-gray-400">Entre em conta no Focus</p>
                </div>
                <Separator />
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                        <Button className="w-full bg-purple" type="submit">Login</Button>
                    </form>
                </Form>        
            </div>
        </div>
    )
}