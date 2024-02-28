"use server";

import * as z from "zod";
import { AccountSchemaBackend } from "@/schemas/profile";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import storageClient from "@/lib/storageClient";

export const updateAccountAction = async (
  data: z.infer<typeof AccountSchemaBackend>
) => {
  const validatedData = AccountSchemaBackend.safeParse(data);

  if (!validatedData.success) {
    return { error: "Invalid fields!" };
  }

  const { name, phone, id, photo } = validatedData.data;

  if (photo) {
    try {
      const timestamp = new Date().getTime();
      // Convert the base64 string to a Blob
      const base64String = `data:image/png;base64,${photo}`;
      const response = await fetch(base64String);
      const blob = await response.blob();

      // Wait for the upload to finish
      await storageClient
        .from("s1-dev/avatar")
        .upload(`${id}_${timestamp}.png`, blob, {
          cacheControl: "3600",
          contentType: "image/png",
        });

      await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          name: name,
          phone: phone,
          image: `https://vlyhguzcuqmgcwvxirun.supabase.co/storage/v1/object/public/s1-dev/avatar/${id}_${timestamp}.png`,
        },
      });
      revalidatePath("/app/profile");
      return { success: "Profile updated successfully!" };
    } catch (error) {
      return { error: "Something went wrong!" };
    }
  } else {
    try {
      await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          name: name,
          phone: phone,
        },
      });
      revalidatePath("/app/profile");
      return { success: "Profile updated successfully!" };
    } catch (error) {
      return { error: "Something went wrong!" };
    }
  }
};
