"use server";

import { auth, firestore } from "@/firebase/server";
import { Listing } from "@/types/listing";
import { listingDataSchema } from "@/validation/listingSchema";
import { revalidatePath } from "next/cache";

export const deleteListing = async (listingId: string, authToken: string) => {
    const verifiedToken = await auth.verifyIdToken(authToken);

    if (!verifiedToken.admin) {
        return {
            error: true,
            message: "Unauthorized"
        }
    }

    await firestore.collection("listings").doc(listingId).delete();

}

export const updateListing = async (data: Listing, authToken: string) => {
    const { id, ...listingData } = data;
    const verifiedToken = await auth.verifyIdToken(authToken);

    if (!verifiedToken.admin) {
        return {
            error: true,
            message: "Unauthorized"
        }
    }

    const validation = listingDataSchema.safeParse(listingData);
    if (!validation.success) {
        return {
            error: true,
            message: validation.error.issues[0]?.message ?? "An error occured",
        };
    }

    await firestore.collection("listings").doc(id).update({
        ...listingData,
        updated: new Date()
    });

    revalidatePath(`/listing/${id}`);
}