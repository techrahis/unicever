"use server";

import prisma from "@/lib/prisma";
import { OrganizationSchema } from "@/schemas/organization";
import { revalidatePath } from "next/cache";
import { z } from "zod";

//create organization for first time
export const OrganizationCreate = async (
  values: z.infer<typeof OrganizationSchema>
) => {
  try {
    const validateData = OrganizationSchema.safeParse(values);
    if (!validateData.success) {
      return { message: "😥 Please Chcek your data", variant: "error" };
    }
    const { userId, name, phone, email, description, address, logo } =
      validateData.data;

    //creating organization
    await prisma.organization.create({
      data: {
        userId,
        name,
        phone,
        email,
        description,
        address,
        logo,
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
export const OrganizationUpdate = async (
  values: z.infer<typeof OrganizationSchema>,
  id: string
) => {
  try {
    //validating data
    const validate = OrganizationSchema.safeParse(values);
    if (!validate.success) {
      return { message: "😥 Please Chcek your data", variant: "error" };
    }

    //getting data from validation data
    const { name, phone, email, address, description, logo } = validate.data;

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
        logo: logo,
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
