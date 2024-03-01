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
import { JsonObject } from "@prisma/client/runtime/library";
import { CheckIcon } from "@radix-ui/react-icons";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DragNDrop from "./drag-drop";

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
      image: organizationDetails?.image || "",
      logo: organizationDetails?.logo || "",
    },
  });

  const [isPending, startTransition] = useTransition();
  const savedImages = form.getValues("image");
  const [files, setFiles] = useState<{ file: File; src: string }[]>(
    JSON.parse(savedImages)
  );
  const avatar =
    typeof organizationDetails?.logo === "string"
      ? JSON.parse(organizationDetails?.logo)
      : organizationDetails?.logo;
  //create or update organization data
  const onSubmit = async (values: z.infer<typeof OrganizationSchema>) => {
    //getting logo image
    const formData = new FormData();
    const avatar: File = form.getValues("logo")[0];
    const bgImages = form.getValues("image");
    const {
      logo,
      image,
      ...details
    }: {
      [key: string]: string;
    } = values;
    for (const key in details) {
      formData.append(key, details[key]);
    }
    formData.append("userId", userId as string);
    formData.append(
      "logo",
      avatar ? avatar : JSON.stringify(form.getValues("logo"))
    );
    for (const fileObj of files) {
      formData.append("image", fileObj.file);
    }
    formData.append("image", bgImages);
    startTransition(async () => {
      //checking weather organization exists or not
      if (organizationDetails) {
        const { message, variant } = await OrganizationUpdate({
          formData,
          id: organizationDetails.id!,
          prevLogo: organizationDetails.logo as JsonObject,
        });
        toast({
          title: message,
          variant: variant === "success" ? "success" : "error",
        });
      } else {
        const { message, variant } = await OrganizationCreate(formData);
        toast({
          title: message,
          variant: variant === "success" ? "success" : "error",
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
                          <AvatarImage src={avatar?.src} />
                          <AvatarFallback className="uppercase font-bold">
                            hk
                          </AvatarFallback>
                        </Avatar>
                        <FormControl>
                          <Input
                            required={false}
                            id="logo"
                            type="file"
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
            <div>
              <FormField
                name="image"
                render={() => (
                  <FormItem>
                    <Label htmlFor="image">Image</Label>
                    <FormControl>
                      <DragNDrop files={files} setFiles={setFiles} />
                      {/* <Input
                        type="file"
                        multiple={true}
                        {...form.register("image")}
                        id="image"
                      /> */}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                "saving..."
              ) : (
                <div className="flex gap-1 items-center">
                  <CheckIcon className="w-4 h-4 mr-2" />
                  Save Changes
                </div>
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
