"use server";
import prisma from "@/lib/prisma";
import cloudinary from "@/lib/cloudinaryClient";
import { student } from "@/schemas/student";
import { certificateType } from "@/types/studentType";
import { JsonValue } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { verifyPdf } from "./stamp-attach";

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
        findExistStudent.certificateData,
        findExistStudent.verifyUrl
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

// adding certificate to db and uploading to cloudinary
export const addCertificate = async (values: z.infer<typeof student>) => {
  try {
    const { id, name, studentId, certificate, eventId } = values;

    if (!(certificate instanceof File))
      return { message: "Provide certificate", variant: "error" };

    // Generating verification link
    const stampLink = `http://unicever.vercel.app/verify/${id}`;

    // Verifying PDF
    const verifiedFile = await verifyPdf(certificate, stampLink);
    const verifiedCertificate = verifiedFile.get("file") as File;

    // Convert File to Base64 string for Cloudinary
    const arrayBuffer = await verifiedCertificate.arrayBuffer();
    const base64String = Buffer.from(arrayBuffer).toString("base64");
    const dataUri = `data:${verifiedCertificate.type};base64,${base64String}`;

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(dataUri, {
      folder: `UNICEVER/certificates/${eventId}`,
      public_id: `${eventId}_${studentId}_${certificate.name}`,
      resource_type: "auto",
    });

    // Prepare certificate data
    const certificateDetails = {
      id: uploadResult.asset_id,
      src: uploadResult.secure_url,
      path: uploadResult.public_id, // Store public_id for deletion later
    };

    // Save to DB
    await prisma.certificate.create({
      data: {
        id,
        name,
        studentId,
        certificateData: certificateDetails,
        eventId,
        verifyUrl: stampLink,
      },
    });

    // Revalidate
    revalidatePath(`/app/event/${eventId}`);
    return { message: "Successfully added", variant: "success" };
  } catch (error) {
    console.error("Add Certificate Error:", error);
    return { message: "Something went wrong", variant: "error" };
  }
};

//update student data
export const updateStudentData = async (
  values: z.infer<typeof student>,
  existCertificate: JsonValue,
  verifyUrl: string
) => {
  try {
    const { id, name, studentId, certificate, eventId } = values;
    let newCertificate = existCertificate;

    // If a new certificate file is uploaded
    if (certificate instanceof File) {
      const oldPath = (existCertificate as certificateType)?.path;

      // Delete the old certificate from Cloudinary
      if (oldPath) {
        await cloudinary.uploader.destroy(oldPath, {
          resource_type: "raw",
        });
      }

      // Verify and stamp the PDF
      const verifiedFile = await verifyPdf(certificate, verifyUrl);
      const verifiedCertificate = verifiedFile.get("file") as File;

      // Convert to base64
      const arrayBuffer = await verifiedCertificate.arrayBuffer();
      const base64String = Buffer.from(arrayBuffer).toString("base64");
      const dataUri = `data:${verifiedCertificate.type};base64,${base64String}`;

      // Upload to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(dataUri, {
        folder: `UNICEVER/certificates/${eventId}`,
        public_id: `${eventId}_${studentId}_${certificate.name}`,
        resource_type: "raw",
        format: "pdf",
      });

      // New certificate data
      newCertificate = {
        id: uploadResult.asset_id,
        src: uploadResult.secure_url,
        path: uploadResult.public_id,
      };
    }

    // Update certificate data in DB
    await prisma.certificate.update({
      where: { id },
      data: {
        id,
        name,
        studentId,
        certificateData: newCertificate!,
        eventId,
      },
    });

    // Revalidate path
    revalidatePath(`/app/event/${eventId}`);
    return { message: "Successfully updated", variant: "success" };
  } catch (error) {
    console.error("Update Certificate Error:", error);
    return { message: "Something went wrong", variant: "error" };
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

export const deleteStudentById = async (id: string, eventId: string) => {
  try {
    // Fetch student with certificate info
    const findStudent = await getStudentById(id);
    const path = (findStudent?.certificateData as certificateType)?.path;

    // Delete from Cloudinary if path exists
    if (path) {
      await cloudinary.uploader.destroy(path, {
        resource_type: "raw", // for PDFs
      });
    }

    // Delete from DB
    await prisma.certificate.delete({
      where: { id },
    });

    // Revalidate page
    revalidatePath(`/app/event/${eventId}`);
    return { message: "Successfully deleted", variant: "success" };
  } catch (error) {
    console.error("Delete Student Error:", error);
    return { message: "Please try again", variant: "error" };
  }
};

export const getStudentByCertifcateId = async (id: string) => {
  try {
    const data = await prisma.certificate.findUnique({
      where: {
        id,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};
