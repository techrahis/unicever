import { z } from "zod";

export const studentShema = z.object({
  name: z.string().min(1, { message: "please enter student name" }),
  RegNo: z.string().min(1, { message: "please enter registration no" }),
  image:z.string().optional()
});
