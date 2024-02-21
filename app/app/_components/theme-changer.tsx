"use client";

import * as React from "react";
import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon, LaptopIcon } from "@radix-ui/react-icons";

export default function ThemeChanger() {
  const currentTheme = localStorage.getItem("theme") as string;
  const [position, setPosition] = React.useState(currentTheme);
  const { setTheme } = useTheme();
  return (
    <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
      <DropdownMenuRadioItem value="light" onClick={() => setTheme("light")}>
        Light <SunIcon className="w-4 h-4 ml-2" />
      </DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="dark" onClick={() => setTheme("dark")}>
        Dark <MoonIcon className="w-4 h-4 ml-2" />
      </DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="system" onClick={() => setTheme("system")}>
        System <LaptopIcon className="w-4 h-4 ml-2" />
      </DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
  );
}
