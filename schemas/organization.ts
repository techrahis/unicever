import { z } from "zod";

const MAX_SIZE = 250 * 1024;
const allowedExtension = ["image/jpg", "image/jpeg", "image/png"];
export const OrganizationSchema = z.object({
  userId: z.string(),
  name: z.string().min(1, { message: "Please enter organization name" }),
  description: z
    .string()
    .min(20, { message: "Please add a short description" }),
  address: z.string().min(1, { message: "Please add address" }),
  phone: z.string().length(10, { message: "Phone no should be 10 digit" }),
  email: z.string().email({ message: "Please add a valid email" }),
  image: z.any().optional(),
  logo: z
    .any()
    .optional()
    // .refine(
    //   (file) => !file || !file[0] || file[0].size <= MAX_SIZE,
    //   "Logo should be max 250 kb"
    // )
    // .refine(
    //   (file) => !file || !file[0] || allowedExtension.includes(file[0].type),
    //   "only jpg, jpeg, png are supported"
    // ),
});
