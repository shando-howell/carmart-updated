"use server";

import { auth } from "@/firebase/server";
import { firestore } from "@/firebase/server";
import { cookies } from "next/headers";

export const deleteUserWatchList = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("firebaseAuthToken")?.value;

    if (!token) {
        return;
    }
        
    try {
        const decodedToken = await auth.verifyIdToken(token);
        await firestore.collection("watchlist").doc(decodedToken.uid).delete();

    } catch (e) {

    }
}