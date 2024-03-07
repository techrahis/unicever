import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getEventById } from "@/server/event-create";
import React from "react";
import AddCertificate from "../_components/AddCertificate";
import { getStudentsByEventId } from "@/server/add-student";
import BackButton from "../../_components/BackButton";

const EventDetails = async ({ params }: { params: { id: string } }) => {
  const event = await getEventById(params.id);
  const studentsByEvent = await getStudentsByEventId(event?.id!);
  return (
    <div>
      <BackButton />
      <Card>
        <CardHeader>
          <CardTitle>{event?.title}</CardTitle>
          <div className="text-[0.8rem] text-muted-foreground flex justify-between items-center">
            <p>{event?.location}</p>
            <p>{event?.date.toLocaleDateString()}</p>
          </div>
        </CardHeader>

        <CardContent>
          <p className="text-sm">{event?.description}</p>
          <AddCertificate eventId={event?.id} studentsData={studentsByEvent} />
        </CardContent>
      </Card>
    </div>
  );
};

export default EventDetails;
