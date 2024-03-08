import { z } from "zod";
const MAX_SIZE = 1000000;
export const student = z.object({
  id: z.string(),
  eventId: z.string(),
  name: z.string().min(1, { message: "please enter student name" }),
  regNo: z.string().min(1, { message: "please enter registration no" }),
  certificate: z.lazy(() =>
    z.any().refine(
      (value) => {
        if (typeof value === "string") return value.trim().length > 0;
        return (
          !value ||
          !value[0] ||
          (value[0].size <= MAX_SIZE && value[0].type === "application/pdf")
        );
      },
      { message: "File is invalid" }
    )
  ),
});

export const studentSchema = z.object({ student: student.array() });
