"use server";

import prisma from "@/lib/prisma";
import { AccountSchema } from "@/schemas/profile";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export const updateAccountAction = async (
  data: z.infer<typeof AccountSchema>
) => {
  const validatedData = AccountSchema.safeParse(data);

  if (!validatedData.success) {
    return { message: "Invalid fields!", variant: "error" };
  }

  const { name, phone, id, photo } = validatedData.data;

  try {
    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        phone: phone,
        image: photo,
      },
    });
    revalidatePath("/app/profile");
    return { message: "Profile updated successfully!", variant: "success" };
  } catch (error) {
    return { message: "Something went wrong!", variant: "error" };
  }
};
