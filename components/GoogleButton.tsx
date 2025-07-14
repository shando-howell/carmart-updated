"use client";

import { Button } from "./ui/button";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";

const GoogleButton = () => {
  const router = useRouter();
  const auth = useAuth();

  return (
    <Button onClick={async () => {
      try {
        await auth?.loginWithGoogle();
        router.push("/vehicles")
      } catch (e) {

      }
    }}
    className="w-full text-black"
    variant="outline"
    >
        Continue with Google
    </Button>
  )
}

export default GoogleButton;