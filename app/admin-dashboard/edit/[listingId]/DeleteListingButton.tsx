"use client";

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';
import { TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { deleteListing } from './actions';
import { useRouter } from 'next/navigation';

const DeleteListingButton = ({ 
    listingId
}: {
    listingId: string;
}) => {
    const router = useRouter();
    const auth = useAuth();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteClick = async () => {
        const token  = await auth?.currentUser?.getIdToken();

        if (!token) {
            return;
        }

        setIsDeleting(true);

        await deleteListing(listingId, token);
        toast("Listing has been deleted");

        setIsDeleting(false);
        router.push("/admin-dashboard");
    }

  return (
    <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button variant="destructive" size="icon">
                <TrashIcon />
            </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>
                    Are you sure you want to delete this listing?
                </AlertDialogTitle>
                <AlertDialogDescription asChild>
                    <div>
                        This action cannot be undone. This will permanently delete this listing.
                    </div>
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button onClick={handleDeleteClick} disabled={isDeleting}>
                    {isDeleting ? "Deleting..." : "Delete Listing"}
                </Button>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteListingButton