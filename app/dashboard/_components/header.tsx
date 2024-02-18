import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

export default function DashboardHeader() {
  return (
    <header className="flex justify-between bg-accent items-center h-16 px-2 sm:px-10">
      <section>
        <h1>Unicever</h1>
      </section>
      <section>
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <HamburgerMenuIcon className="w-6 h-6" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>
    </header>
  );
}
