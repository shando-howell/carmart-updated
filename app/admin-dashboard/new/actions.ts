"use server"

import { auth, firestore } from "@/firebase/server";
import { listingDataSchema } from "@/validation/listingSchema";

export const createListing = async (data: {
    make: string;
    model: string;
    year: number;
    vehicleType: string;
    price: number;
    description: string;
    condition: "new" | "pre-owned";
    status: "draft" | "for-sale" | "withdrawn" | "sold",
}, authToken: string) => {
    const verifiedToken = await auth.verifyIdToken(authToken);

    if (!verifiedToken.admin) {
        return {
            error: true,
            message: "Unauthorized"
        }
    }

    const validation = listingDataSchema.safeParse(data);
    if (!validation.success) {
        return {
            error: true,
            message: validation.error.issues[0]?.message ?? "An error occured",
        }
    }

    const listing = await firestore.collection("listings").add({
        ...data,
        created: new Date(),
        updated: new Date()
    })

    return {
        listingId: listing.id,
    };
};