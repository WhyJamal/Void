"use server";

import { signIn } from "next-auth/react";

export async function signInAction(data: { email: string; password: string }) {
  return await signIn("credentials", data);
}