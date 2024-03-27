"use client";
import { Button } from "@/components/ui/button";
import { certificateType, studentType } from "@/types/studentType";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PdfViewer = ({
  studentData,
}: {
  studentData: studentType;
}) => {
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
    <div className="">
      <div className="my-8">
        <Button onClick={handleDownload}>download</Button>
      </div>
      <div className="w-[600px]">
        {(studentData.certificateData as certificateType) && (
          <Document
            file={(studentData.certificateData as certificateType)?.src!}
          >
            <Page pageNumber={1} width={600} />
          </Document>
        )}
      </div>
    </div>
  );
};

export default PdfViewer;
