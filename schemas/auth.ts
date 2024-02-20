import * as z from "zod";

export const SignInSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(1, {
    message: "Please enter a password",
  }),
});

export const SignUpSchema = z.object({
  organizationName: z.string().min(1, {
    message: "Please enter your organization name",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(6, {
    message: "Please enter a password with at least 6 characters",
  }),
});
