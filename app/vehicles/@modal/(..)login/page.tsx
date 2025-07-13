"use client"

import LoginForm from "@/components/LoginForm";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"

const LoginModal = () => {
    const router = useRouter();

    return (
        <Dialog 
            open 
            onOpenChange={() => {
            router.back();
        }}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Login
                    </DialogTitle>
                    <DialogDescription>
                        You must be logged in to add a vehicle to your watch list.
                    </DialogDescription>
                </DialogHeader>
                <LoginForm/>
            </DialogContent>
        </Dialog>
    )
}

export default LoginModal