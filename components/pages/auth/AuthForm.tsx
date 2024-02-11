"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  email: z.string().email(),
});

export default function AuthForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values.email);
    const signInResult = await signIn("email", {
      email: values.email,
      callbackUrl: `${window.location.origin}`,
      redirect: false,
    });

    if (!signInResult?.ok) {
      return toast({
        title: "Well this did not work...",
        description: "Something went wrong, please try again",
        variant: "destructive",
      });
    }

    return toast({
      title: "Check your email",
      description: "A magic link has been sent to you",
    });
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Official email address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="contact@makaut.ac.in"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button className="w-full" variant={"default"} type="submit">
          Login with Email
        </Button>
      </form>
    </Form>
  );
}
