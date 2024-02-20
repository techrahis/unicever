"use client";

import * as React from "react";
import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";

export default function ThemeChanger() {
  const currentTheme = localStorage.getItem("theme") as string;
  const [position, setPosition] = React.useState(currentTheme);
  const { setTheme } = useTheme();
  return (
    <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
      <DropdownMenuRadioItem value="light" onClick={() => setTheme("light")}>
        Light
      </DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="dark" onClick={() => setTheme("dark")}>
        Dark
      </DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="system" onClick={() => setTheme("system")}>
        System
      </DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
  );
}
