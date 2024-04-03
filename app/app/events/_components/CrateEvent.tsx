"use client";
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
import { eventSchema } from "@/schemas/event";
import { createEvent, updateEvent } from "@/server/event-create";
import { eventType } from "@/types/eventType";
import { organizationType } from "@/types/organizationType";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import BackButton from "../../_components/BackButton";

const CreateEvent = ({
  organization,
  id,
  eventDetails,
}: {
  organization: organizationType | null;
  id: string;
  eventDetails: eventType | null | undefined;
}) => {
  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      id: id,
      orgId: organization?.id || "",
      title: eventDetails?.title || "",
      location: eventDetails?.location || "",
      date: eventDetails?.date?.toISOString().split("T")[0] || "",
      description: eventDetails?.description || "",
    },
  });
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const onSubmit = async (data: z.infer<typeof eventSchema>) => {
    startTransition(async () => {
      if (eventDetails) {
        const { message, variant } = await updateEvent(data);
        if (variant === "success") router.push("/app");
        toast({
          title: message,
          description: new Date().toISOString(),
        });
      } else {
        const response = await createEvent(data);

        if (response.variant === "success") router.push("/app");
        toast({
          title: response.message,
          description: new Date().toISOString(),
        });
      }
    });
  };
  return (
    <div>
      <BackButton />
      <Card>
        <CardHeader>
          <CardTitle>Create or Edit Your Event</CardTitle>
          <CardDescription>
            Please provide some details about event name, location, date etc.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  name="title"
                  render={() => (
                    <FormItem>
                      <Label htmlFor="title">Title</Label>
                      <FormControl>
                        <Input
                          type="text"
                          {...form.register("title")}
                          name="title"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="location"
                  render={() => (
                    <FormItem>
                      <Label htmlFor="location">Location</Label>
                      <FormControl>
                        <Input
                          type="text"
                          {...form.register("location")}
                          name="location"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="date"
                  render={() => (
                    <FormItem>
                      <Label htmlFor="date">Date</Label>
                      <FormControl>
                        <Input
                          type="date"
                          {...form.register("date")}
                          name="date"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-4">
                <FormField
                  name="description"
                  render={() => (
                    <FormItem>
                      <Label htmlFor="description">description</Label>
                      <FormControl>
                        <Textarea
                          rows={8}
                          {...form.register("description")}
                          name="description"
                        ></Textarea>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={isPending}>
                <CheckIcon className="mr-2" />
                Save Changes
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default CreateEvent;
