"use server";

import prisma from "@/lib/prisma";
import storageClient from "@/lib/storageClient";
import { OrganizationSchema } from "@/schemas/organization";
import { JsonObject } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";

//create organization for first time
export const OrganizationCreate = async (formData: FormData) => {
  try {
    const values: Record<string, any> = {};
    //converting form data to objcet
    formData.forEach((value, key) => {
      values[key] = value;
    });
    const validateData = OrganizationSchema.safeParse(values);
    if (!validateData.success) {
      return { message: "😥 Please Chcek your data", variant: "error" };
    }
    const { userId, name, phone, email, description, address, logo } =
      validateData.data;

    let logoDetails = {};
    //checking weather logo is a file or not
    if (logo instanceof File) {
      //uploading file
      const { data, error } = await storageClient
        .from("s1-dev/avatar")
        .upload(`${userId}_${logo.name}`, logo, {
          cacheControl: "3600",
        });
      if (error) return { message: "❌ Something went wrong. please try again", variant: "error" };

      //updating logoDetails with uploaded file data
      logoDetails = {
        src: `https://vlyhguzcuqmgcwvxirun.supabase.co/storage/v1/object/public/${
          (data as any).fullPath
        }`,
        id: (data as any).id,
        path: data.path,
      };
    }

    //creating organization
    await prisma.organization.create({
      data: {
        userId,
        name,
        phone,
        email,
        description,
        address,
        logo: logoDetails,
      },
    });
    revalidatePath("/app/profile");
    return { message: "✅ Changes has been saved", variant: "success" };
  } catch (error) {
    return {
      message: "❌ Something went wrong please try again",
      variant: "error",
    };
  }
};

//update organization
export const OrganizationUpdate = async ({
  formData,
  id,
  prevLogo,
}: {
  formData: FormData;
  id: string;
  prevLogo: JsonObject;
}) => {
  try {
    // console.log(formData.get("image") as FileList)
    // for(const img in formData.get("image")){
    //   console.log(img)
    // }
    const values: Record<string, any> = {};
    //converting form data to objcet
    formData.forEach((value, key) => {
      values[key] = value;
    });

    //validating data
    const validate = OrganizationSchema.safeParse(values);
    if (!validate.success) {
      return { message: "😥 Please Chcek your data", variant: "error" };
    }

    //getting data from validation data
    const { userId, name, phone, email, address, description, logo, image } =
      validate.data;

    //getting exist organization logo details
    let logoDetails = prevLogo;

    //if user change file or upload new one
    if (logo instanceof File) {
      //deleting exist file
      if (typeof logoDetails === "object" && "path" in logoDetails!) {
        await storageClient
          .from("s1-dev")
          .remove([`avatar/${logoDetails.path}`]);
      }

      //uploading new one
      const { data, error } = await storageClient
        .from("s1-dev/avatar")
        .upload(`${userId}_${logo.name}`, logo, {
          cacheControl: "3600",
        });

      //if any error occured
      if (error) return { message: "❌ something went wrong. please try again", variant: "error" };
      //updating logoDetails with new uploading data
      logoDetails = {
        src: `https://${
          process.env.DATABASE_NAME
        }.supabase.co/storage/v1/object/public/${(data as any).fullPath}`,
        id: (data as any).id,
        path: data.path,
      };
    }

    //updating data
    await prisma.organization.update({
      where: {
        id: id,
      },
      data: {
        name,
        phone,
        email,
        description,
        address,
        logo: logoDetails!,
      },
    });
    revalidatePath("/app/profile");
    return { message: "✅ data updated successfully", variant: "success" };
  } catch (error) {
    return {
      message: "❌ something went wrong please try again",
      variant: "error",
    };
  }
};

//get organization by userId
export const getOrganization = async (userId: string) => {
  const data = await prisma.organization.findFirst({
    where: {
      userId: userId,
    },
  });

  return data;
};
