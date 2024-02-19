import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1
        className={cn(
          "text-3xl font-semibold tracking-widest text-blue-900 dark:text-white",
          font.className
        )}
      >
        <span className="bg-blue-900 rounded-md px-2 mr-1 text-white">Uni</span>
        cever
      </h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
