"use client"

import ListingForm from "@/components/ListingForm";
import { auth } from "@/firebase/client";
import { Listing } from "@/types/listing";
import { listingDataSchema } from "@/validation/listingSchema";
import { SaveIcon } from "lucide-react";
import { z } from "zod";
import { updateListing } from "./actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = Listing;

const EditListingForm = ({ 
    id, 
    make, 
    model, 
    year, 
    vehicleType, 
    price, 
    description,
    condition,
    status
}: Props) => {
    const router = useRouter();
    const handleSubmit = async (data: z.infer<typeof listingDataSchema>) => {
        const token = await auth?.currentUser?.getIdToken();

        if (!token) {
            return;
        }

        await updateListing({...data, id}, token);
        toast.success("Success", {
            description: "Listing updated!",
        })

        router.push("/admin-dashboard");
    };

    return (
        <div>
            <ListingForm 
                handleSubmit={handleSubmit}
                submitButtonLabel={<><SaveIcon /> Save Listing</>}
                defaultValues={{
                    make, 
                    model, 
                    year, 
                    vehicleType, 
                    price, 
                    description,
                    condition,
                    status,
                }}
            />
        </div>
    )
}

export default EditListingForm;