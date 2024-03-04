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
          description:formatTime(new Date())
        });
      } else {
        const { message, variant } = await OrganizationCreate({
          ...values,
          userId: userId!,
        });
        toast({
          title: message,
          variant: variant === "success" ? "success" : "error",
          description:formatTime(new Date())
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
                              ? organizationDetails.name.split(" ")[0].charAt(0) + 
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
