"use server";

import prisma from "@/lib/prisma";
import * as z from "zod";
import bcrypt from "bcrypt";
import { SignUpSchema } from "@/schemas/auth";

export const signUp = async (data: z.infer<typeof SignUpSchema>) => {
  const validatedData = SignUpSchema.safeParse(data);

  if (!validatedData.success) {
    return { error: "Invalid fields!" };
  }
  const { organizationName, email, password } = validatedData.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

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
