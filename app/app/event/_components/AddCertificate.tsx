"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { studentShema } from "@/schemas/student";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type student = {
  name: string | null;
  RegNo: string | null;
  image: File | null;
};
const AddCertificate = () => {
  const [studentRow, setStudentRow] = useState<student[]>([]);
  const form = useForm<z.infer<typeof studentShema>>({
    resolver: zodResolver(studentShema),
    defaultValues: {
      name: "",
      RegNo: "",
      image: "",
    },
  });

  const handleAdd = () => {
    setStudentRow((prev) => [...prev, { name: "", RegNo: "", image: null }]);
  };

  const handleOnChange = (index: number, fieldName: string, value: string) => {
    setStudentRow((prev) => {
      const newArray = [...prev];
      newArray[index] = { ...newArray[index], [fieldName]: value };
      return newArray;
    });
  };
  const handleSubmit = (index: number) => {
    const findData = studentRow[index];
    if (findData && findData.name !== null && findData.RegNo !== null && findData.image !== null) {
      console.log(findData);
    }
  };
  return (
    <div className="mt-4 grid gap-4">
      {studentRow.map((student, index) => (
        <form key={index} onSubmit={()=>handleSubmit(index)}>
          <div className="flex items-center gap-4 flex-col lg:flex-row">
            <Input
              required
              type="text"
              onChange={(e) => handleOnChange(index, "name", e.target.value)}
            />

            <Input
              required
              type="text"
              onChange={(e) => handleOnChange(index, "RegNo", e.target.value)}
            />

            <Input
              required
              type="file"
              onChange={(e) => handleOnChange(index, "image", e.target.value[0])}
            />

            <Button type="submit">
              Save
            </Button>
            <Button>Delete</Button>
          </div>
        </form>
      ))}
      <div
        onClick={handleAdd}
        className={buttonVariants({ className: "cursor-pointer" })}
      >
        Add new
      </div>
    </div>
  );
};

export default AddCertificate;
