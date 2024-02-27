import * as z from "zod";

const MAX_FILE_SIZE = 250 * 1024; // 250 kilobytes
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const AccountSchema = z.object({
  id: z.string(),
  photo: z
    .any()
    .optional()
    .refine(
      (files) => !files || !files[0] || files[0].size <= MAX_FILE_SIZE,
      `Max image size is 250KB.`
    )
    .refine(
      (files) =>
        !files || !files[0] || ACCEPTED_IMAGE_TYPES.includes(files[0].type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  phone: z.string().length(10, {
    message: "Phone number should be 10 digits long",
  }),
  name: z.string().min(1, {
    message: "Please enter a name",
  }),
});

export const AccountSchemaBackend = z.object({
  id: z.string(),
  photo: z.any().optional(),
  phone: z.string().length(10, {
    message: "Phone number should be 10 digits long",
  }),
  name: z.string().min(1, {
    message: "Please enter a name",
  }),
});
