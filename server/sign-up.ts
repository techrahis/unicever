"use server";

import prisma from "@/lib/prisma";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { SignUpSchema } from "@/schemas/auth";
import { getUserByEmail } from "@/lib/get-user-by-email";

export const signUpAction = async (data: z.infer<typeof SignUpSchema>) => {
  const validatedData = SignUpSchema.safeParse(data);

  if (!validatedData.success) {
    return { error: "Invalid fields!" };
  }
  const { organizationName, email, password } = validatedData.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "User already exists!" };
  }

  await prisma.user.create({
    data: {
      organizationName,
      email,
      password: hashedPassword,
    },
  });

  return { success: "User created successfully!" };
};
