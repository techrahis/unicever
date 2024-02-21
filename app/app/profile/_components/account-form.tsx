import { auth } from "@/auth";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { AccountSchema } from "@/schemas/profile";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "@radix-ui/react-icons";

export default async function AccountForm() {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });
  const form = useForm<z.infer<typeof AccountSchema>>({
    resolver: zodResolver(AccountSchema),
    defaultValues: {
      name: "",
      phone: "",
    },
  });
  return (
    <Form {...form}>
      <form>
        <CardContent className="space-y-4">
          <section className="flex flex-col justify-between space-y-4 sm:space-y-0 sm:space-x-4 sm:flex-row">
            <div className="space-y-1 w-full">
              <Label htmlFor="picture">Profile picture</Label>
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
                <Input id="picture" type="file" />
              </section>
            </div>
            <div className="space-y-1 w-full">
              <Label htmlFor="phone">Phone</Label>
              <Input
                type="number"
                id="phone"
                defaultValue={user?.phone || undefined}
              />
            </div>
          </section>

          <section className="flex flex-col justify-between space-y-4 sm:space-y-0 sm:space-x-4 sm:flex-row">
            <div className="space-y-1 w-full">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue={session?.user.name || undefined} />
            </div>
            <div className="space-y-1 w-full">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                defaultValue={session?.user.email || undefined}
                disabled
              />
            </div>
          </section>
        </CardContent>
        <CardFooter>
          <Button type="submit">
            <CheckIcon className="w-4 h-4 mr-2" />
            Save changes
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
