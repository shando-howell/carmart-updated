"use client"

import { removeWatching } from "@/app/vehicles/actions"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth"
import { Trash2Icon } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function RemoveWatchListButton({listingId}: {
    listingId: string
}) {
    const auth = useAuth();
    const router = useRouter();
    return (
        <Button variant="outline" onClick={async () => {
            const tokenResult = await auth?.currentUser?.getIdTokenResult();
            if (!tokenResult) {
                return;
            }
            await removeWatching(listingId, tokenResult.token);
            toast("Vehicle removed from watchlist.");
            router.refresh();
        }}>
            <Trash2Icon />
        </Button>
    )
}