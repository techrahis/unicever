"use server";
import prisma from "@/lib/prisma";
import storageClient from "@/lib/storageClient";
import { student } from "@/schemas/student";
import { revalidatePath } from "next/cache";
import { z } from "zod";
export const addCertificate = async (values: z.infer<typeof student>) => {
  try {
    const validate = student.safeParse({
      ...values,
      certificate: values.certificate.get("certificate"),
    });
    if (!validate.success) {
      return { message: "please check all field", variant: "error" };
    }
    const { id, name, regNo, certificate, eventId } = validate.data;
    const { data, error } = await storageClient
      .from("organization/image")
      .upload(`${eventId}_${regNo}_${certificate.name}`, certificate, {
        cacheControl: "3600",
      });
    if (error) throw error;
    await prisma.student.create({
      data: {
        id,
        name,
        regNo,
        certificate: (data as any)?.fullPath,
        eventId,
      },
    });
    revalidatePath(`/app/event/${eventId}`);
    return { message: "Successfully added", variant: "success" };
  } catch (error) {
    return { message: "Something went wrong", variant: "error" };
  }
};

export const getStudentsByEventId = async (eventId: string) => {
  try {
    const data = await prisma.student.findMany({
      where: {
        eventId: eventId,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
