"use client";
import { Button } from "@/components/ui/button";
import { certificateType, studentType } from "@/types/studentType";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import PdfLoading from "./PdfLoading";
import IsMobile from "./IsMobile";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PdfViewer = ({ studentData }: { studentData: studentType }) => {
  const isMobileScreen = IsMobile();
  const handleDownload = async () => {
    const response = await fetch(
      (studentData?.certificateData as certificateType)?.src as string
    );
    const blob = await response.blob();
    const link = document.createElement("a");
    const url = window.URL.createObjectURL(new Blob([blob]));
    link.href = url;
    link.setAttribute(
      "download",
      `${
        (studentData?.certificateData as certificateType)?.path?.split("_")[2]
      }`
    );
    document.body.appendChild(link);
    link.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  };
  return (
    <div className="w-full mx-auto flex justify-center items-center flex-col gap-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="md:flex md:justify-between md:items-center grid gap-3">
            <div>{studentData.name}</div>
            <Button variant="link" onClick={handleDownload}>Download</Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="md:w-[500px] w-[260px] h-fit">
            {(studentData.certificateData as certificateType) && (
              <Document
                file={(studentData.certificateData as certificateType)?.src!}
                loading={<PdfLoading />}
              >
                <Page
                  pageNumber={1}
                  width={isMobileScreen ? 290 : 500}
                  canvasBackground="bg-primary/10"
                  loading={<PdfLoading />}
                />
              </Document>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PdfViewer;
