"use server";

import * as z from "zod";
import { SignInSchema } from "@/schemas/auth";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const signInAction = async (data: z.infer<typeof SignInSchema>) => {
  const validatedData = SignInSchema.safeParse(data);

  if (!validatedData.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedData.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
};
