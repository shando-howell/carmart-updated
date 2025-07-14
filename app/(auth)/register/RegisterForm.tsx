"use client"

import GoogleButton from "@/components/GoogleButton";
import { Button } from "@/components/ui/button";
import { 
    Form, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormControl, 
    FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerUserSchema } from "@/validation/registerUser";
import { registerUser } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
    const router = useRouter();

    const form = useForm<z.infer<typeof registerUserSchema>>({
        resolver: zodResolver(registerUserSchema),
        defaultValues: {
            email: "",
            password: "",
            passwordConfirm: "",
            name: "",
        }
    })

    const handleSubmit = async (data: z.infer<typeof registerUserSchema>) => {
        const response = await registerUser(data);

        if (!!response?.error) {
            toast("There was an error in your registration process.")
            return;
        }

        toast("Your are successfully registered.")

        router.push("/login");
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <fieldset disabled={form.formState.isSubmitting} className="flex flex-col gap-4">
                    <FormField control={form.control} name="name" render={({field}) => {
                        return (
                            <FormItem>
                                <FormLabel>
                                    Enter Your Name
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Name" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )
                    }}/>

                    <FormField control={form.control} name="email" render={({field}) => {
                        return (
                            <FormItem>
                                <FormLabel>
                                    Enter Your Email
                                </FormLabel>
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
                                <FormLabel>
                                    Enter Your Password
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Password" type="password"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )
                    }}/>

                    <FormField control={form.control} name="passwordConfirm" render={({field}) => {
                        return (
                            <FormItem>
                                <FormLabel>
                                    Comfirm Your Password
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Confirm Password" type="password"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )
                    }}/>
                    <Button type="submit" className="text-black">Register</Button>
                    <div className="text-center">or</div>
                </fieldset>
            </form>
            <GoogleButton />
        </Form>
    )
}

export default RegisterForm