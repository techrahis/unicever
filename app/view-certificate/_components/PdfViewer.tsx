"use client";
import { buttonVariants } from "@/components/ui/button";
import { certificateType, studentType } from "@/types/studentType";
import Link from "next/link";
import React from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PdfViewer = ({ studentData }: { studentData: studentType }) => {
  return (
    <div className="">
      <div className="my-8">
        <Link
          href={(studentData.certificateData as certificateType)?.src!}
          target="_blank"
          download
          rel="noopener noreferrer"
          className={buttonVariants()}
        >
          Download Certificate
        </Link>
      </div>
      <div className="h-fit m-[0,auto] w-fit">
        {(studentData.certificateData as certificateType) && (
          <Document
            file={(studentData.certificateData as certificateType)?.src!}
          >
            <Page pageNumber={1} />
          </Document>
        )}
      </div>
    </div>
  );
};

export default PdfViewer;
