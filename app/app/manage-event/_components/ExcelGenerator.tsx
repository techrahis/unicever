"use client";
import { Button } from "@/components/ui/button";
import { certificateXlsxType } from "@/types/studentType";
import * as XLSX from "xlsx";
const ExcelGenerator = ({
  allStudentData,
}: {
  allStudentData: certificateXlsxType[];
}) => {
  const handleDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(allStudentData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Certificates");

    const excelBuffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "certificateData.xlsx";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };
  return (
    <div className="my-4">
      <Button
        variant="ghost"
        className="capitalize"
        onClick={handleDownload}
      >
        get certificates data
      </Button>
    </div>
  );
};

export default ExcelGenerator;
