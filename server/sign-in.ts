"use server";

import * as z from "zod";
import { SignInSchema } from "@/schemas/auth";

export const signIn = async (data: z.infer<typeof SignInSchema>) => {
  const validatedData = SignInSchema.safeParse(data);

  if (!validatedData.success) {
    return { error: "Invalid fields!" };
  }
  return { success: "Email sent!" };
};
