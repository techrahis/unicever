import { z } from "zod";
const MAX_SIZE = 1000000;

export const CertificateTypeSchema = z.object({
  id: z.string().min(2),
  path: z.string().min(2),
  src: z.string().min(2),
});

export const student = z.object({
  id: z.string(),
  eventId: z.string(),
  name: z.string().min(1, { message: "please enter student name" }),
  studentId: z.string().min(1, { message: "please enter registration no" }),
  certificate: z.lazy(() =>
    CertificateTypeSchema.refine(
      (value) => {
        return CertificateTypeSchema.safeParse(value).success;
      },
      { message: "File is required" }
    ).or(
      z.any().refine(
        (value) => {
          return (
            value instanceof File &&
            value.size <= MAX_SIZE &&
            value.type === "application/pdf"
          );
        },
        { message: "File is invalid" }
      )
    )
  ),
});

export const studentSchema = z.object({ student: student.array() });
