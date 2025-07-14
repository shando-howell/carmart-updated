"use client"

import GoogleButton from "@/components/GoogleButton";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth";
import { passwordValidation } from "@/validation/registerUser";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
    email: z.string().email(),
    password: passwordValidation
})

export default function LoginForm() {
    const router = useRouter()
    const auth = useAuth();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const handleSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            await auth?.loginWithEmail(data.email, data.password);
            router.push("/vehicles");
        } catch (e: any) {
            console.log({ e });
            toast("Invalid login credentials.")
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <fieldset disabled={form.formState.isSubmitting} className="flex flex-col gap-4">
                        <FormField control={form.control} name="email" render={({field}) => {
                            return (
                                <FormItem>
                                    <FormControl>
                                        <Input {...field} placeholder="Email" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )
                        }}/>

                        <FormField control={form.control} name="password" render={({field}) => {
                            return (
                                <FormItem>
                                    <FormControl>
                                        <Input {...field} placeholder="Password" type="password"/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )
                        }}/>
                        <Button type="submit" className="text-black">Login</Button>
                        <div>
                            Forgotten your password? <Link href="/forgot-password" className="pl-1 underline">Reset it here</Link>
                        </div>
                        <div className="text-center pb-5">or</div>
                    </fieldset>
                </form>
                <GoogleButton />
            </Form>
        </>
    )
}