"use client";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { ImagePlus, X } from "lucide-react";
import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
interface DragNDropProps {
  files: { file: File; preview: string }[];
  setFiles: React.Dispatch<
    React.SetStateAction<{ file: File; preview: string }[]>
  >;
}
const DragNDrop: React.FC<DragNDropProps> = ({ files, setFiles }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      if (files.length + acceptedFiles.length <= 5) {
        const previewFile = acceptedFiles.map((file) => ({
          file,
          preview: URL.createObjectURL(file),
        }));
        // console.log(previewFile)
        setFiles((prev) => [...prev, ...previewFile]);
      } else {
        toast({
          title: "You can upload at most 5 image",
        });
      }
    },
  });

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const removeFile = (preview: string) => {
    setFiles((prev) => prev.filter((file) => file.preview !== preview));
  };

  console.log(files);
  return (
    <div
      className={cn(
        "w-full h-96 outline-dashed outline-2 outline-input shadow rounded-md grid",
        { "grid-rows-[auto,8rem]": files.length > 0 }
      )}
    >
      <div
        {...getRootProps()}
        className={cn("w-full h-full grid place-items-center", {
          "bg-accent": isDragActive,
        })}
      >
        <Input
          {...getInputProps()}
          type="file"
          name="image"
          className="hidden"
          accept="image/*"
          id="image"
          multiple={true}
        />
        <div className="flex flex-col items-center gap-1">
          <ImagePlus className="h-8 w-8 text-blue-600" />
          <p className="text-sm text-muted-foreground">
            drag and drop files here
          </p>
          <p className="text-sm text-muted-foreground">or</p>
          <div
            className={cn(
              buttonVariants({
                variant: "secondary",
                className: "cursor-pointer",
              })
            )}
          >
            Broswe
          </div>
        </div>
      </div>
      <div
        className={cn(
          "h-full border-t-2 border-dashed border-input p-2 overflow-y-scroll md:overflow-hidden",
          { hidden: files.length <= 0 }
        )}
      >
        <div className="grid grid-cols-3 md:flex gap-4 h-full">
          {files.map((file) => (
            <div
              key={file.preview}
              className="relative group cursor-pointer mt-2"
            >
              <img
                src={file?.preview}
                alt="orgnization image"
                className="md:h-full md:w-32 lg:w-auto rounded-md h-20 w-full"
              />

              <X
                onClick={() => removeFile(file.preview)}
                className="absolute -top-2 -right-2 z-50 h-6 w-6 p-1 bg-rose-600 rounded-full shadow 
              font-bold  cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DragNDrop;
