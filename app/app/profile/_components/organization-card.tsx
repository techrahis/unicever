"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { OrganizationSchema } from "@/schemas/organization";
import {
  OrganizationCreate,
  OrganizationUpdate,
} from "@/server/organization-crud";
import { organizationType } from "@/types/organizationType";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon } from "@radix-ui/react-icons";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formatTime } from "./formatTime";

export default function OrganizationCard({
  userId,
  organizationDetails,
}: {
  userId: string | undefined;
  organizationDetails: organizationType | null;
}) {
  const form = useForm<z.infer<typeof OrganizationSchema>>({
    resolver: zodResolver(OrganizationSchema),
    defaultValues: {
      userId: organizationDetails?.userId || "",
      name: organizationDetails?.name || "",
      description: organizationDetails?.description || "",
      address: organizationDetails?.address || "",
      phone: organizationDetails?.phone || "",
      email: organizationDetails?.email || "",
      logo: organizationDetails?.logo || "",
    },
  });

  const [isPending, startTransition] = useTransition();
  //create or update organization data
  const onSubmit = async (values: z.infer<typeof OrganizationSchema>) => {
    startTransition(async () => {
      //checking weather organization exists or not
      if (organizationDetails) {
        const { message, variant } = await OrganizationUpdate(
          { ...values, userId: userId! },
          organizationDetails.id!
        );
        toast({
          title: message,
          variant: variant === "success" ? "success" : "error",
          description: formatTime(new Date()),
        });
      } else {
        const { message, variant } = await OrganizationCreate({
          ...values,
          userId: userId!,
        });
        toast({
          title: message,
          variant: variant === "success" ? "success" : "error",
          description: formatTime(new Date()),
        });
      }
    });
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Organization</CardTitle>
        <CardDescription>
          Make changes to your organization here. Click save changes when you
          are done.
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <section className="flex flex-col justify-between space-y-4 sm:space-y-0 sm:space-x-4 sm:flex-row">
              <div className="space-y-1 w-full">
                <FormField
                  name="logo"
                  render={() => (
                    <FormItem>
                      <Label htmlFor="logo">Logo</Label>
                      <section className="flex space-x-2 items-center">
                        <Avatar>
                          <AvatarImage src={organizationDetails?.logo!} />
                          <AvatarFallback className="uppercase font-bold">
                            {organizationDetails?.name
                              ? organizationDetails.name
                                  .split(" ")[0]
                                  .charAt(0) +
                                organizationDetails.name.split(" ")[1].charAt(0)
                              : ""}
                          </AvatarFallback>
                        </Avatar>
                        <FormControl>
                          <Input
                            id="logo"
                            type="url"
                            {...form.register("logo")}
                          />
                        </FormControl>
                        <FormMessage />
                      </section>
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-1 w-full">
                <FormField
                  name="name"
                  render={() => (
                    <FormItem>
                      <Label htmlFor="name">Name</Label>
                      <FormControl>
                        <Input
                          {...form.register("name")}
                          type="text"
                          id="name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </section>

            <section className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1 w-full">
                <FormField
                  name="phone"
                  render={() => (
                    <FormItem>
                      <Label htmlFor="phone">Phone No</Label>
                      <FormControl>
                        <Input
                          id="phone"
                          type="text"
                          {...form.register("phone")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-1 w-full">
                <FormField
                  name="email"
                  render={() => (
                    <FormItem>
                      <Label htmlFor="email">Email</Label>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          {...form.register("email")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-1 w-full">
                <FormField
                  name="address"
                  render={() => (
                    <FormItem>
                      <Label htmlFor="description">Address</Label>
                      <FormControl>
                        <Input
                          id="description"
                          type="text"
                          {...form.register("address")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </section>

            <div className="space-y-1 w-full">
              <FormField
                name="description"
                render={() => (
                  <FormItem>
                    <Label htmlFor="description">Description</Label>
                    <FormControl>
                      <Textarea
                        rows={8}
                        id="description"
                        {...form.register("description")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isPending}>
                <div className="flex gap-2 items-center">
                  {isPending ? (
                    <svg
                      aria-hidden="true"
                      className="inline w-5 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  ) : (
                    <CheckIcon className="w-4 h-4" />
                  )}
                  Save Changes
                </div>
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
