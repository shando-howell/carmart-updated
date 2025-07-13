"use client";

import { Button } from "./ui/button";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";

const GoogleButton = () => {
  const router = useRouter();
  const auth = useAuth();

  return (
    <Button onClick={async () => {
      await auth?.loginWithGoogle();
      router.push("/")
    }}
    className="w-full text-black"
    >
        Continue with Google
    </Button>
  )
}

export default GoogleButton;