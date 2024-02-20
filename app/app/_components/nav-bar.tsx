import { auth, signOut } from "@/auth";
import Image from "next/image";
import DemoProfileImage from "../_assets/demo-profile.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import ThemeChanger from "./theme-changer";
import Link from "next/link";

export default async function NavBar() {
  const session = await auth();
  console.log(session?.user.image);

  return (
    <nav className="flex justify-between items-center border-b-2 px-2 sm:px-20 py-3">
      <Link href="/app">
        <Image src="/logo.svg" alt="Unicever Logo" width={150} height={150} />
      </Link>
      <section className="flex items-center space-x-2">
        <span>
          <h1 className="text-sm font-bold">Hola 👋🏻</h1>
          <h1 className="text-sm font-bold">{session?.user.name}</h1>
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Image
              className="rounded-full"
              src={session?.user.image || DemoProfileImage}
              alt="Unicever Logo"
              width={45}
              height={45}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mr-4">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/app/settings">
              <DropdownMenuItem>
                <IoSettingsOutline className="w-6 h-6" />
                <p className="ml-1">Settings</p>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem>
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button className="flex items-center" type="submit">
                  <MdLogout className="w-6 h-6" />
                  <p className="ml-1">Sign out</p>
                </button>
              </form>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <ThemeChanger />
          </DropdownMenuContent>
        </DropdownMenu>
      </section>
    </nav>
  );
}
