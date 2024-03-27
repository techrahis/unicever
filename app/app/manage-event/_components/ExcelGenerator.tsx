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
    allStudentData.forEach((data, index) => {
      worksheet[`C${index + 2}`] = {
        t: "s", // Set cell type to hyperlink
        v: data.verifyUrl, // Set hyperlink display text
        l: { Target: data.verifyUrl }, // Set hyperlink target
      };
    });
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
    <div className="my-4 w-full flex sm:justify-end">
      <Button
        variant="link"
        className="capitalize text-blue-800"
        onClick={handleDownload}
      >
        Export Student Records
      </Button>
    </div>
  );
};

export default ExcelGenerator;
