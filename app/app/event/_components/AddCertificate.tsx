"use client";
import { Button, buttonVariants } from "@/components/ui/button";
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
import {
  certificateCrud,
  deleteStudentById,
  getStudentById,
} from "@/server/add-student";
import { studentType } from "@/types/studentType";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { v4 as uuid4 } from "uuid";
import { z } from "zod";
import { formatTime } from "../../profile/_components/formatTime";
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
          regNo: item.regNo || undefined,
          certificate: item.certificate || undefined,
        })) || [],
    },
  });
  const [isSavePending, startSaveTransition] = useTransition();
  const [isDeletePending, startDeleteTransition] = useTransition();
  const [currentIndex, setCurrentIndex] = useState<number | null>(1);
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
    formData.append(
      "certificate",
      values.certificate[0] instanceof File
        ? values.certificate[0]
        : values.certificate
    );
    startSaveTransition(async () => {
      const { message } = await certificateCrud({
        ...values,
        certificate: formData,
      });
      toast({
        title: message,
        description: formatTime(new Date()),
      });
    });
  };

  const deleteStudent =  (index: number) => {
    const isExist = fields[index].certificate;
    if (isExist) {
      startDeleteTransition(async () => {
        const { message } = await deleteStudentById(
          studentsData?.[index]?.id as string
        );
        toast({
          title: message,
          description: formatTime(new Date()),
        });
      });
    }
    remove(index);
  };
  return (
    <div className="mt-4 flex flex-col space-y-4">
      {fields.map((field, index) => (
        <Form {...form} key={field.id}>
          <form
            onSubmit={form.handleSubmit(() => {
              const formData = form.getValues().student[index];
              onSubmit(formData);
              if (!isSavePending) setCurrentIndex(index);
            })}
            encType="multipart/form-data"
          >
            <h1 className="text-sm my-4 text-muted-foreground">
              # Student - {index + 1}
            </h1>
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
                  name={`student.${index}.regNo`}
                  control={form.control}
                  render={({ fieldState }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          className={cn({ "lg:my-auto": fieldState.error })}
                          {...form.register(`student.${index}.regNo`)}
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
                  render={() => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="file"
                          {...form.register(`student.${index}.certificate`)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-4 w-full">
                {typeof studentsData?.[index]?.certificate === "string" && (
                  <Link
                    className={buttonVariants({
                      variant: "link",
                      className: "text-indigo-800",
                    })}
                    href={`https://zhazktxebwicfwgtzlsi.supabase.co/storage/v1/object/public/${studentsData?.[index]?.certificate}`}
                    target="_blank"
                  >
                    <Eye />
                  </Link>
                )}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSavePending && currentIndex === index}
                >
                  Save
                </Button>
                <div
                  onClick={() => {
                    setCurrentIndex(index);
                    deleteStudent(index);
                  }}
                  className={buttonVariants({
                    variant: "destructive",
                    className: `${
                      isDeletePending && currentIndex == index
                        ? "opacity-60 pointer-events-none"
                        : ""
                    } cursor-pointer w-full`,
                  })}
                >
                  Delete
                </div>
              </div>
            </div>
          </form>
        </Form>
      ))}
      <Button
        className="w-fit"
        variant="link"
        onClick={() => {
          append({
            id: uuid4(),
            eventId: eventId as string,
            name: "",
            regNo: "",
            certificate: "",
          });
        }}
      >
        Add new
      </Button>
    </div>
  );
};

export default AddCertificate;
