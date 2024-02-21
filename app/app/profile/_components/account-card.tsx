import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckIcon } from "@radix-ui/react-icons";
import prisma from "@/lib/prisma";

export default async function AccountCard() {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>
          Make changes to your account here. Click save changes when you are
          done.
        </CardDescription>
      </CardHeader>
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
    </Card>
  );
}
