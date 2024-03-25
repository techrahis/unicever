"use server";
import prisma from "@/lib/prisma";
import storageClient from "@/lib/storageClient";
import { student } from "@/schemas/student";
import { certificateType } from "@/types/studentType";
import { JsonValue } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const certificateCrud = async (values: z.infer<typeof student>) => {
  try {
    //validating data
    const validate = student.safeParse({
      ...values,
      certificate:
        values.certificate instanceof FormData
          ? values.certificate.get("certificate")
          : values.certificate,
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
        findExistStudent.certificateData
      );
      return { message };
    }
    //either create
    const { message } = await addCertificate(validate.data);
    return { message };
  } catch (error) {
    //throw error
    return { message: "something went wrong", variant: "error" };
  }
};

//adding new student
export const addCertificate = async (values: z.infer<typeof student>) => {
  try {
    const { id, name, studentId, certificate, eventId } = values;
    console.log(certificate);
    //uploading to supabase
    const { data, error } = await storageClient
      .from("organization/image")
      .upload(`${eventId}_${studentId}_${certificate.name}`, certificate, {
        cacheControl: "3600",
      });
    if (error) return { message: "something went wrong", variant: "error" };
    //creating new student
    const certificateDetails = {
      id: (data as any)?.id,
      src: `https://${
        process.env.DATABASE_NAME
      }.supabase.co/storage/v1/object/public/${(data as any).fullPath}`,
      path: data.path,
    };
    await prisma.certificate.create({
      data: {
        id,
        name,
        studentId,
        certificateData: certificateDetails,
        eventId,
      },
    });
    //revalidating path
    revalidatePath(`/app/event/${eventId}`);
    return { message: "Successfully added", variant: "success" };
  } catch (error) {
    //throw error;
    return { message: "Something went wrong", variant: "error" };
  }
};

//update student data
export const updateStudentData = async (
  values: z.infer<typeof student>,
  existCertificate: JsonValue
) => {
  try {
    const { id, name, studentId, certificate, eventId } = values;
    let newCertificate = existCertificate;
    //chcking certificate is file or not
    if (certificate instanceof File) {
      await storageClient
        .from("organization")
        .remove([`image/${(existCertificate as certificateType)?.path}`]);
      //if file update file
      const { data, error } = await storageClient
        .from("organization")
        .upload(`${eventId}_${studentId}_${certificate.name}`, certificate, {
          cacheControl: "3600",
        });
      if (error) return { message: "something went wrong", variant: "error" };
      console.log(data);
      newCertificate = {
        id: (data as any)?.id,
        src: `https://${
          process.env.DATABASE_NAME
        }.supabase.co/storage/v1/object/public/${(data as any).fullPath}`,
        path: data.path,
      };
    }

    //updating data
    await prisma.certificate.update({
      where: {
        id: id,
      },
      data: {
        id,
        name,
        studentId,
        certificateData: newCertificate!,
        eventId,
      },
    });

    //revalidating path
    revalidatePath(`/app/event/${eventId}`);
    return { message: "Successfully updated", variant: "success" };
  } catch (error) {
    //throw error;
    return { message: "something went wrong", variant: "error" };
  }
};

//get students based on event id
export const getStudentsByEventId = async (eventId: string) => {
  try {
    const data = await prisma.certificate.findMany({
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
    const studentData = await prisma.certificate.findUnique({
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
export const deleteStudentById = async (id: string, eventId: string) => {
  try {
    const findStudent = await getStudentById(id);
    await storageClient
      .from("organization")
      .remove([
        `image/${(findStudent?.certificateData as certificateType)?.path}`,
      ]);
    await prisma.certificate.delete({
      where: { id: id },
    });

    revalidatePath(`/app/event/${eventId}`);
    return { message: "successfully deleted", variant: "success" };
  } catch (error) {
    return { message: "please try again", variant: "error" };
  }
};
