"use server";

import { OrganizationSchema } from "@/schemas/organization";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

//create organization for first time
export const OrganizationCreate = async (
  values: z.infer<typeof OrganizationSchema>
) => {
  try {
    //validating data
    const validateData = OrganizationSchema.safeParse(values);
    if (!validateData.success) {
      console.log("please check");
      return { meesage: "Please Chcek your data", variant: "error" };
    }
    const { userId, name, phone, email, description, address, logo } =
      validateData.data;

    const logoDetails = {
      src: `https://vlyhguzcuqmgcwvxirun.supabase.co/storage/v1/object/public/${logo.fullPath}`,
      id: logo.id,
      path: logo.path,
    };
    //creating organization
    await prisma.organization.create({
      data: {
        userId,
        name,
        phone,
        email,
        description,
        address,
        logo: JSON.stringify(logoDetails),
      },
    });
    revalidatePath("/app/profile");
    return { message: "created succesfully", variant: "success" };
  } catch (error) {
    return {
      message: "something went wrong please try again",
      variant: "error",
    };
  }
};

//update organization
export const OrganizationUpdate = async ({
  values,
  id,
}: {
  values: z.infer<typeof OrganizationSchema>;
  id: string;
}) => {
  try {
    const validateData = OrganizationSchema.safeParse(values);
    if (!validateData.success) {
      console.log("please check");
      return { message: "Please Chcek your data", variant: "error" };
    }
    const { name, phone, email, description, address, logo } =
      validateData.data;

    const logoDetails = {
      src:`https://${process.env.DATABASE_NAME}.supabase.co/storage/v1/object/public/${logo.fullPath}`,
      id: logo.id,
      path: logo.path,
    };
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
        logo: JSON.stringify(logoDetails),
      },
    });
    revalidatePath("/app/profile");
    return { message: "data updated successfully", variant: "success" };
  } catch (error) {
    return {
      message: "something went wrong please try again",
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
