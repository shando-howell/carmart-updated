"use server"

import { revalidatePath } from "next/cache"

export const loginSuccess = async () => {
    revalidatePath("/vehicles");
}