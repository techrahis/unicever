"use server";
import prisma from "@/lib/prisma";
import storageClient from "@/lib/storageClient";
import { student } from "@/schemas/student";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const certificateCrud = async (values: z.infer<typeof student>) => {
  try {
    //validating data
    const validate = student.safeParse({
      ...values,
      certificate: values.certificate.get("certificate"),
    });

    if (!validate.success) {
      return { message: "please check all fields", variant: "error" };
    }

    const { id } = validate.data;
    //finding existing student
    const findExistStudent = await getStudentById(id);

    //if exist update
    if (findExistStudent) {
      const { message } = await updateStudentData(
        validate.data,
        findExistStudent.certificate
      );
      return { message };
    }
    //either create
    const { message } = await addCertificate(validate.data);
    return { message };
  } catch (error) {
    return { message: "something went wrong", variant: "error" };
  }
};

//adding new student
export const addCertificate = async (values: z.infer<typeof student>) => {
  try {
    const { id, name, regNo, certificate, eventId } = values;
    //uploading to supabase
    const { data, error } = await storageClient
      .from("organization/image")
      .upload(`${eventId}_${regNo}_${certificate.name}`, certificate, {
        cacheControl: "3600",
      });
    if (error) return { message: "something went wrong", variant: "error" };
    //creating new student
    await prisma.student.create({
      data: {
        id,
        name,
        regNo,
        certificate: (data as any)?.fullPath,
        eventId,
      },
    });
    //revalidating path
    revalidatePath(`/app/event/${eventId}`);
    return { message: "Successfully added", variant: "success" };
  } catch (error) {
    return { message: "Something went wrong", variant: "error" };
  }
};

//update student data
export const updateStudentData = async (
  values: z.infer<typeof student>,
  existCertificate: string
) => {
  try {
    const { id, name, regNo, certificate, eventId } = values;
    let newCertificate = existCertificate;
    //chcking certificate is file or not
    if (certificate instanceof File) {
      //if file update file
      const { data, error } = await storageClient
        .from("organization")
        .update(`image/${existCertificate.split("/")[2]}`, certificate, {
          cacheControl: "3600",
          upsert: true,
        });
      if (error) return { message: "something went wrong", variant: "error" };
      newCertificate = (data as any)?.fullPath;
    }

    //updating data
    await prisma.student.update({
      where: {
        id: id,
      },
      data: {
        id,
        name,
        regNo,
        certificate: newCertificate,
        eventId,
      },
    });

    //revalidating path
    revalidatePath(`/app/event/${eventId}`);
    return { message: "Successfully updated", variant: "success" };
  } catch (error) {
    return { message: "something went wrong", variant: "error" };
  }
};

//get students based on event id
export const getStudentsByEventId = async (eventId: string) => {
  try {
    const data = await prisma.student.findMany({
      where: {
        eventId: eventId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

//get student based on id
export const getStudentById = async (id: string) => {
  try {
    const studentData = await prisma.student.findUnique({
      where: {
        id,
      },
    });

    return studentData;
  } catch (error) {
    console.log(error);
    return;
  }
};

//deleting student based on id
export const deleteStudentById = async (id: string) => {
  try {
    const findStudent = await getStudentById(id);
    await storageClient
      .from("organization")
      .remove([`image/${findStudent?.certificate.split("/")[2]}`]);
    await prisma.student.delete({
      where: { id: id },
    });
    return { message: "successfully deleted", variant: "success" };
  } catch (error) {
    return { message: "please try again", variant: "error" };
  }
};
