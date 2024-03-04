import * as z from "zod";

export const AccountSchema = z.object({
  id: z.string(),
  photo: z.string().optional(),
  phone: z.string().length(10, {
    message: "Phone number should be 10 digits long",
  }),
  name: z.string().min(1, {
    message: "Please enter a name",
  }),
});
