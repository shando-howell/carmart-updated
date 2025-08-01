"use client"

import { 
    AlertDialog, 
    AlertDialogAction, 
    AlertDialogCancel, 
    AlertDialogContent, 
    AlertDialogDescription, 
    AlertDialogFooter, 
    AlertDialogHeader, 
    AlertDialogTitle, 
    AlertDialogTrigger 
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { removeToken } from "@/context/actions"
import { useAuth } from "@/context/auth"
import { EmailAuthProvider, deleteUser, reauthenticateWithCredential } from "firebase/auth"
import { useState } from "react"
import { toast } from "sonner"
import { deleteUserWatchList } from "./watch-list/actions"

const DeleteAccountButton = () => {
    const auth = useAuth();
    const [isDeleting, setIsDeleting] = useState(false);
    const [password, setPassword] = useState("");

    const handleDeleteClick = async () => {
        if (auth?.currentUser?.email) {
            setIsDeleting(true);

            try {
                await reauthenticateWithCredential(
                    auth.currentUser, 
                    EmailAuthProvider.credential(auth.currentUser.email, password)
                );
                await deleteUserWatchList()
                await deleteUser(auth.currentUser);
                await removeToken();
                toast("Your account was deleted successfully!")
            } catch (e) {
                toast("An error has occured.")
            }
            setIsDeleting(false);
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full">
                    Delete Account
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure you want to delete your account?
                    </AlertDialogTitle>
                    <AlertDialogDescription asChild>
                        <div>
                            This action cannot be undone. This will permanently delete your 
                            account and remove all your data from our servers.
                            <div>
                                <Label>
                                    Enter current password to continue.
                                </Label>
                                <Input 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                />
                            </div>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteClick} disabled={isDeleting}>
                        {isDeleting ? "Deleting..." : "Delete Account"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteAccountButton