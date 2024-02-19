"use server";

import * as z from "zod";
import { SignUpSchema } from "@/schemas/auth";

export const signUp = async (data: z.infer<typeof SignUpSchema>) => {
  const validatedData = SignUpSchema.safeParse(data);

  if (!validatedData.success) {
    return { error: "Invalid fields!" };
  }
  return { success: "Email sent!" };
};
