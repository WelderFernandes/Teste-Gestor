'use server'

import { SignInWithPassword } from "@/http/sign-in-with-password";
export async function Authenticate(credecials: { email: string; password: string }) {

    const response = await SignInWithPassword(credecials)
    console.log("🚀 ~ Authenticate ~ STATUS:", response)

    if(response?.error) {
        return null
    }
    return response
}