"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { student, studentSchema } from "@/schemas/student";
import { certificateCrud, deleteStudentById } from "@/server/add-student";
import { certificateType, studentType } from "@/types/studentType";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, ListPlus } from "lucide-react";
import Link from "next/link";
import { MutableRefObject, useRef, useState, useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { v4 as uuid4 } from "uuid";
import { z } from "zod";
import { formatTime } from "../../profile/_components/formatTime";
import { fileNameShort, fileNameShort2_0 } from "./fileNameShort";
const AddCertificate = ({
  eventId,
  studentsData,
}: {
  eventId: string | undefined;
  studentsData: studentType[] | null | undefined;
}) => {
  const form = useForm<z.infer<typeof studentSchema>>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      student:
        studentsData?.map((item) => ({
          id: item.id || undefined,
          eventId: item.eventId || undefined,
          name: item.name || undefined,
          studentId: item.studentId || undefined,
          certificate: item.certificateData || undefined,
        })) || [],
    },
  });
  const [isSavePending, startSaveTransition] = useTransition();
  const [isDeletePending, startDeleteTransition] = useTransition();
  const [currentIndex, setCurrentIndex] = useState<number | null>(1);
  const fileRef: MutableRefObject<(HTMLInputElement | null)[]> = useRef([]);
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "student",
  });

  const onSubmit = (values: z.infer<typeof student>) => {
    if (isSavePending)
      return toast({
        title: "Only one at a time",
        description: formatTime(new Date()),
      });
    const formData = new FormData();
    if (values.certificate instanceof File) {
      formData.append("certificate", values.certificate);
    }
    startSaveTransition(async () => {
      const { message } = await certificateCrud({
        ...values,
        certificate:
          values.certificate instanceof File ? formData : values.certificate,
      });
      toast({
        title: message,
        description: formatTime(new Date()),
      });
    });
  };

  const deleteStudent = (index: number) => {
    startDeleteTransition(async () => {
      const { message } = await deleteStudentById(
        studentsData?.[index]?.id as string,
        eventId as string
      );
      toast({
        title: message,
        description: formatTime(new Date()),
      });
      remove(index);
    });
  };
  return (
    <div className="mt-4 flex flex-col space-y-4">
      {fields.map((Inputfield, index) => (
        <Form {...form} key={Inputfield.id}>
          <form
            onSubmit={form.handleSubmit(() => {
              const formData = form.getValues().student[index];
              onSubmit(formData);
              if (!isSavePending) setCurrentIndex(index);
            })}
            encType="multipart/form-data"
          >
            <div className="flex gap-2 items-center">
              <h1 className="text-sm my-4 text-muted-foreground">
                # Student - {index + 1}
              </h1>
              {(studentsData?.[index]?.certificateData as certificateType) && (
                <Link
                  href={`${(studentsData?.[index]?.certificateData as certificateType)
                    ?.src
                    }`}
                  target="_blank"
                >
                  <Eye className="h-4 w-4 text-indigo-700 " />
                </Link>
              )}
            </div>
            <div className="grid lg:grid-cols-4 gap-4 w-full">
              <div className="w-full space-y-1">
                <FormField
                  name={`student.${index}.name`}
                  control={form.control}
                  render={({ fieldState }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          className={cn({ "lg:my-auto": fieldState.error })}
                          {...form.register(`student.${index}.name`)}
                          placeholder="e.g student name..."
                        />
                      </FormControl>
                      {form?.formState?.errors?.student?.[index]?.name && (
                        <FormMessage />
                      )}
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full space-y-1">
                <FormField
                  name={`student.${index}.studentId`}
                  control={form.control}
                  render={({ fieldState }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          className={cn({ "lg:my-auto": fieldState.error })}
                          {...form.register(`student.${index}.studentId`)}
                          placeholder="e.g student id..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full space-y-1">
                <FormField
                  name={`student.${index}.certificate`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex gap-2 items-center bg-transparent border border-border rounded-md">
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => fileRef.current[index]?.click()}
                        >
                          {(studentsData?.[index]
                            ?.certificateData as certificateType)
                            ? "Change File"
                            : "Choose File"}
                        </Button>
                        <div id={`file-name-${index}`}>
                          <p className="text-sm">
                            {(studentsData?.[index]
                              ?.certificateData as certificateType)
                              ? fileNameShort(
                                (
                                  studentsData?.[index]
                                    ?.certificateData as certificateType
                                )?.path?.split("_")[2]
                              )
                              : "No file cho.."}
                          </p>
                        </div>
                      </div>
                      <FormControl>
                        <Input
                          type="file"
                          className="hidden"
                          ref={(el: HTMLInputElement | null) =>
                            (fileRef.current[index] = el)
                          }
                          onChange={(event) => {
                            const fileList = event.target.files;
                            if (fileList && fileList.length > 0) {
                              const firstFile = fileList[0];
                              field.onChange(firstFile);

                              const fileName = document.getElementById(
                                `file-name-${index}`
                              );
                              if (fileName) {
                                fileName.textContent = fileNameShort2_0(
                                  firstFile.name
                                );
                              }
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-4 w-full">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSavePending && currentIndex === index}
                >
                  Save
                </Button>
                {!studentsData?.[index]?.certificateData ? (
                  <Button
                    type="button"
                    className="w-full"
                    variant="destructive"
                    onClick={() => remove(index)}
                  >
                    Cancel
                  </Button>
                ) : (
                  <Button
                    type="button"
                    className="w-full"
                    variant="destructive"
                    disabled={isDeletePending && currentIndex === index}
                    onClick={() => {
                      setCurrentIndex(index);
                      deleteStudent(index);
                    }}
                  >
                    Delete
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Form>
      ))}
      <Button
        className="w-fit"
        variant="ghost"
        onClick={() => {
          append({
            id: uuid4(),
            eventId: eventId as string,
            name: "",
            studentId: "",
            certificate: null,
          });
        }}
      >
        <ListPlus className="w-5 h-5 mr-2" />
        Add New
      </Button>
    </div>
  );
};

export default AddCertificate;
