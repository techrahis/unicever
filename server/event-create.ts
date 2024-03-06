"use server";

import { eventSchema } from "@/schemas/event";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

//creating new event
export const createEvent = async (values: z.infer<typeof eventSchema>) => {
  try {
    const validate = eventSchema.safeParse(values);
    if (!validate.success) {
      return { message: "Oops! Something went wrong", variant: "error" };
    }

    const {id, orgId, title, location, date, description } = validate.data;

    await prisma.event.create({
      data: {
        id,
        title,
        location,
        description,
        date:new Date(date),
        organizationId: orgId,
      },
    });

    revalidatePath("/app");
    return { message: "Successfully Created Event", variant: "success" };
  } catch (error) {
    return { message: "Oops! Something went wrong", variant: "error" };
  }
};

//updating data
export const updateEvent = async(values: z.infer<typeof eventSchema>)=>{
  try {
    const validate = eventSchema.safeParse(values);
    if(!validate.success){
      return {message: "Please provide all fields", variant:"error"}
    }
    const {id, orgId, title, description, location, date} = validate.data;
    await prisma.event.update({
      where:{
        id:id
      },
      data:{
        title,
        description,
        location,
        date: new Date(date),
        organizationId:orgId
      }
    });

    revalidatePath("/app");
    return { message: "Successfully Updated Event", variant: "success" };
  } catch (error) {
    return { message: "Something went wrong", variant: "error" };
  }
}


//fetching event by id
export const getEventById = async (id: string) => {
  try {
    const data = await prisma.event.findUnique({
      where: {
        id: id,
      },
      select:{
        id:true,
        organizationId:true,
        title:true,
        description:true,
        location:true,
        date:true,
      }
    });
    return data;
  } catch (error) {
    console.log(error)
  }
};
