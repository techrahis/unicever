import * as z from "zod";

export const AccountSchema = z.object({
  phone: z.string().min(10, {
    message: "Please enter a phone number",
  }),
  name: z.string().min(1, {
    message: "Please enter a name",
  }),
});
