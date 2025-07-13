"use client"

import { FlameIcon } from "lucide-react"
import { addWatching, removeWatching } from "./actions"
import { useAuth } from "@/context/auth"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const ToggleWatchingButton = ({listingId, isWatching}: {
    listingId: string,
    isWatching: boolean;
}) => {
    const auth = useAuth();
    const router = useRouter();

  return (
    <button 
        className="absolute top-0 right-0 z-10 px-2 text-white"
        onClick={async () => {
            const tokenResult = await auth?.currentUser?.getIdTokenResult();
            if (!tokenResult) {
                router.push("/login");
                return;
            }

            if (isWatching) {
                await removeWatching(listingId, tokenResult.token);
            } else {
                await addWatching(listingId, tokenResult.token)
            }

            toast(`New listing ${isWatching ? "removed from" : "added to"} your watch list.`)
            router.refresh();
        }}
    >
        <FlameIcon fill={isWatching ? "red" : "none" }/>
    </button>
  )
}

export default ToggleWatchingButton