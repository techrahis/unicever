import { auth } from "@/auth";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { getOrganization } from "@/server/organization-crud";
import Link from "next/link";
import * as uuid from "uuid";
export default async function Page() {
  const session = await auth();
  const organization = await getOrganization(session?.user.id!);
  const events = await prisma.event.findMany({
    where: {
      organizationId: organization?.id,
    },
  });
  return (
    <div>
      <div className="flex justify-end my-4 items-center">
        <Link
          href={`/app/create-event/${uuid.v4()}`}
          className={buttonVariants({
            variant: "secondary",
          })}
        >
          Create Event
        </Link>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.length > 0
          ? events.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                  <div className="text-[0.8rem] text-muted-foreground flex justify-between items-center">
                    <p className="text-primary">{event.location}</p>
                    <p>{event.date.toLocaleDateString()}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-normal">
                    {event.description?.slice(0, 80) + "..."}
                  </p>
                </CardContent>
                <CardFooter className="flex items-center gap-2">
                  <Link
                    href={`/app/event/${event.id}`}
                    className={buttonVariants({variant:"secondary"})}
                  >
                    Manage
                  </Link>
                  <Link
                    href={`/app/create-event/${event.id}`}
                    className={buttonVariants({variant:"outline"})}
                  >
                    Edit
                  </Link>
                </CardFooter>
              </Card>
            ))
          : ""}
      </div>
    </div>
  );
}
