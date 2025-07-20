"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "@/firebase/client";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react"

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState("");

  return (
    <form onSubmit={async (e) => {
        e.preventDefault();
        await sendPasswordResetEmail(auth, email);
    }}
    className="flex flex-col gap-4"
    >
        <Input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <Button className="w-full text-black" type="submit">Reset Password</Button>
    </form>
  )
}

export default ForgotPasswordForm