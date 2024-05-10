import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getEventById } from "@/server/event-create";
import React from "react";
import AddCertificate from "../_components/AddCertificate";
import { getStudentsByEventId } from "@/server/add-student";
import BackButton from "../../_components/BackButton";
import ExcelGenerator from "../_components/ExcelGenerator";
import prisma from "@/lib/prisma";
const EventDetails = async ({ params }: { params: { id: string } }) => {
  const event = await getEventById(params.id);
  const studentsByEvent = await getStudentsByEventId(event?.id!);
  const allStudentData = await prisma.certificate.findMany({
    where: {
      eventId: event?.id,
    },
    select: {
      name: true,
      studentId: true,
      verifyUrl: true,
    }
  });

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
          {Array.isArray(studentsByEvent) && studentsByEvent.length > 0 && (
            <ExcelGenerator allStudentData={allStudentData} eventData={event?.title} />
          )}
          <AddCertificate eventId={event?.id} studentsData={studentsByEvent} />
        </CardContent>
      </Card>
    </div>
  );
};

export default EventDetails;
