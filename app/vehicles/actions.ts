"use server"

import { auth, firestore } from "@/firebase/server";
import { FieldValue } from "firebase-admin/firestore";

export const removeWatching = async (listingId: string, authToken: string) => {
    const verifiedToken = await auth.verifyIdToken(authToken);

    if (!verifiedToken) {
        return {
            error: true,
            message: "Unauthorized"
        }
    }

    await firestore.collection("watching").doc(verifiedToken.uid).update({
        [listingId]: FieldValue.delete(),
    });
}

export const addWatching = async (listingId: string, authToken: string) => {
    const verifiedToken = await auth.verifyIdToken(authToken);

    if (!verifiedToken) {
        return {
            error: true,
            message: "Unauthorized"
        }
    }

    await firestore.collection("watching").doc(verifiedToken.uid).set({
        [listingId]: true
    }, {
        merge: true
    })
}