import { auth, firestore } from "@/firebase/server";
import { cookies } from "next/headers";
import "server-only"

export const getUserWatchList = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("firebaseAuthToken")?.value;

    if (!token) {
        return {}
    }

    const verifiedToken = await auth.verifyIdToken(token);

    if (!verifiedToken) {
        return {}
    }

    const watchingSnapshot = await firestore
        .collection("watching")
        .doc(verifiedToken.uid)
        .get();

    const watchingData = watchingSnapshot.data();
    return watchingData || {};
};