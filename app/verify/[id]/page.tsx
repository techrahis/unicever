import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStudentByCertifcateId } from "@/server/add-student";
import { getEventById } from "@/server/event-create";
import { getOrganizationById } from "@/server/organization-crud";
import { CalendarCheck, MailIcon, MapPin, MapPinned } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PdfViewer from "../_components/PdfViewer";
import CertificateNotFound from "../_components/CertificateNotFound";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Unicever - Certificate Verification",
  description:
    "Unicever is a certificate verification website used to attach verify link in certificate to ensure certificates legitimacy",
};

const ViewCertificate = async ({ params }: { params: { id: string } }) => {

  const studentData = await getStudentByCertifcateId(params.id);
  const eventData = await getEventById(studentData?.eventId as string);
  const organizationData = await getOrganizationById(
    eventData?.organizationId as string
  );
  if (!studentData) return <CertificateNotFound />;
  return (
    <div className="px-4 md:px-8 max-w-screen-lg pb-5 mx-auto space-y-12  mt-8 relative">
      <div className="md:absolute md:top-0 md:right-8 flex justify-center items-center ">
        <div className="relative md:h-16 md:w-16 rounded-full h-32 w-32 overflow-hidden">
          <Image src={organizationData?.logo as string} alt="logo" fill />
        </div>
      </div>
      <div className="w-full flex flex-col gap-2 items-center md:items-start">
        <h1 className="text-lg md:text-xl lg:text-3xl text-wrap">
          {organizationData?.name}
        </h1>
        <Link
          href={`mailto:${organizationData?.email as string}`}
          className="text-sm text-blue-800 hover:underline underline-offset-4
        flex gap-2 items-center"
        >
          <MailIcon className="h-4 w-4" /> {organizationData?.email}
        </Link>
        <div className="flex items-center gap-2 text-sm text-primary/80">
          <MapPinned className="h-4 w-4 text-fuchsia-800" />{" "}
          {organizationData?.address}
        </div>
        <p className="">{organizationData?.description}</p>
      </div>
      <div className="grid lg:grid-cols-[1.1fr,1.2fr] w-full gap-4">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>{eventData?.title}</CardTitle>
            <div className="">
              <div className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3 text-blue-600" />
                <p>{eventData?.location}</p>
              </div>
              <div className="text-sm text-muted-foreground flex items-center gap-1">
                <CalendarCheck className="h-3 w-3 text-fuchsia-800" />
                <p>{eventData?.date.toLocaleDateString()}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{eventData?.description}</p>
          </CardContent>
        </Card>
        <PdfViewer studentData={studentData} />
      </div>

      <p className="w-full text-center text-sm text-muted-foreground mt-8 capitalize">
        verified by{" "}
        <span className="text-fuchsia-600">&#10051; unicever &#10051;</span>
      </p>
    </div>
  );
};

export default ViewCertificate;
