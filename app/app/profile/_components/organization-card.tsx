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
import storageClient from "@/lib/storageClient";
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
  const avatar = JSON.parse(organizationDetails?.logo as string);

  //create or update organization data
  const onSubmit = async (values: z.infer<typeof OrganizationSchema>) => {
    //getting logo image
    const logo: File = form.getValues("logo")[0];

    //checking if organization exist or not
    if (organizationDetails) {
      //if exist update
      startTransition(async () => {
        const { data, error } = await storageClient
          .from("s1-dev/avatar")
          .upload(`${userId}-${logo.name}`, logo, {
            cacheControl: "3600",
          });
        console.log(data);
        const { message, variant } = await OrganizationUpdate({
          values: { ...values, logo: data },
          id: organizationDetails.id,
        });

        toast({
          title: message,
          variant: variant === "success" ? "success" : "error",
        });
      });
    } else {
      //else create
      startTransition(async () => {
        const { data, error } = await storageClient
          .from("s1-dev/avatar")
          .upload(`${userId}-${logo.name}`, logo, {
            cacheControl: "3600",
          });
        const { message, variant } = await OrganizationCreate({
          ...values,
          userId: userId as string,
          logo: data,
        });

        toast({
          title: message,
          variant: variant === "success" ? "success" : "error",
        });
      });
    }
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
                          <AvatarImage src={avatar.src} />
                          <AvatarFallback className="uppercase font-bold">
                            hk
                          </AvatarFallback>
                        </Avatar>
                        <FormControl>
                          <Input
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
