import { auth, signOut } from "@/auth";
import prisma from "@/lib/prisma";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PersonIcon, ExitIcon, FrameIcon } from "@radix-ui/react-icons";
import ThemeChanger from "./theme-changer";
import Link from "next/link";

export default async function NavBar() {
  const session = await auth();

  const user = await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
    select: {
      id: true,
      name: true,
      phone: true,
      email: true,
      image: true,
    },
  });

  return (
    <nav className="flex justify-between items-center border-b-2 py-3">
      <Link href="/app">
        <Image
          src="/logo-dark.svg"
          className="hidden dark:block"
          alt="Unicever Logo"
          width={150}
          height={150}
        />
        <Image
          src="/logo-light.svg"
          className="dark:hidden block"
          alt="Unicever Logo"
          width={150}
          height={150}
        />
      </Link>
      <section className="flex items-center space-x-2">
        <span>
          <h1 className="text-sm font-bold">Hola 👋🏻</h1>
          <h1 className="text-sm font-bold">{user?.name}</h1>
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={user?.image || undefined} />
              <AvatarFallback className="uppercase font-bold">
                {session?.user.name
                  ? session.user.name.split(" ").length > 1
                    ? session.user.name
                        .split(" ")
                        .slice(0, 2)
                        .map((name) => name[0])
                        .join("")
                    : session.user.name.slice(0, 2)
                  : ""}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mr-4">
            <DropdownMenuLabel>
              <span className="flex items-center">
                <FrameIcon className="w-4 h-4 mr-2" />
                My Account
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/app/profile">
              <DropdownMenuItem>
                <PersonIcon className="w-4 h-4" />
                <p className="ml-2">Profile</p>
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
                  <ExitIcon className="w-4 h-4" />
                  <p className="ml-2">Sign out</p>
                </button>
              </form>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>
              <span className="flex items-center">
                <FrameIcon className="w-4 h-4 mr-2" />
                Appearance
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <ThemeChanger />
          </DropdownMenuContent>
        </DropdownMenu>
      </section>
    </nav>
  );
}
