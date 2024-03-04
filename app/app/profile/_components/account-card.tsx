"use client";

import React, { useTransition } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormItem,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { AccountSchema } from "@/schemas/profile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "@radix-ui/react-icons";
import { updateAccountAction } from "@/server/profile-update";
import { useToast } from "@/components/ui/use-toast";
import { formatTime } from "./formatTime";

type UserProps = {
  id: string | undefined;
  name: string | null;
  phone: string | null;
  image: string | null;
  email: string | null;
} | null;

export default function AccountCard({ user }: { user: UserProps }) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof AccountSchema>>({
    resolver: zodResolver(AccountSchema),
    defaultValues: {
      id: user?.id || undefined,
      photo: user?.image || "",
      phone: user?.phone || "",
      name: user?.name || "",
    },
  });

  const accountAction = (data: z.infer<typeof AccountSchema>) => {
    startTransition(async () => {
      const { message, variant } = await updateAccountAction(data);
      toast({
        title: message,
        variant: variant === "success" ? "success" : "error",
        description: formatTime(new Date()),
      });
    });
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>
          Make changes to your account here. Click save changes when you are
          done.
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(accountAction)}>
          <CardContent className="space-y-4">
            <section className="flex flex-col justify-between space-y-4 sm:space-y-0 sm:space-x-4 sm:flex-row">
              <div className="space-y-1 w-full">
                <FormField
                  name="photo"
                  render={() => (
                    <FormItem>
                      <Label htmlFor="photo">Profile picture</Label>
                      <section className="flex space-x-2 items-center">
                        <Avatar>
                          <AvatarImage src={user?.image || undefined} />
                          <AvatarFallback className="uppercase font-bold">
                            {user?.name
                              ? user.name.split(" ").length > 1
                                ? user.name
                                    .split(" ")
                                    .slice(0, 2)
                                    .map((name) => name[0])
                                    .join("")
                                : user.name.slice(0, 2)
                              : ""}
                          </AvatarFallback>
                        </Avatar>
                        <FormControl>
                          <Input
                            id="photo"
                            {...form.register("photo")}
                            type="url"
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
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="phone">Phone</Label>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </section>

            <section className="flex flex-col justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4 sm:flex-row">
              <div className="space-y-1 w-full">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="name">Name</Label>
                      <FormControl>
                        <Input {...field} type="text" />
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
                      <Label htmlFor="name">Email</Label>
                      <Input
                        type="email"
                        disabled={true}
                        placeholder={user?.email || ""}
                      />
                    </FormItem>
                  )}
                />
              </div>
            </section>
          </CardContent>
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <Input {...field} type="hidden" />
              </FormItem>
            )}
          />
          <CardFooter>
            <Button disabled={isPending} type="submit">
              <CheckIcon className="w-4 h-4 mr-2" />
              Save changes
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
