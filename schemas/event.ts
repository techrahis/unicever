import { z } from "zod";

export const eventSchema = z.object({
    id:z.string(),
    orgId:z.string(),
    title:z.string().min(1, {message:"Please add a title"}),
    location: z.string().min(1, {message:"Please add location"}),
    date:z.string().min(1, {message:"Please choose a date"}),
    description:z.string().min(10, {message:"Please add a short description"})
})