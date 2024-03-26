// imports
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BsGithub } from "react-icons/bs";
import { RiUserShared2Fill } from "react-icons/ri";
import { GrMenu } from "react-icons/gr";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "./theme-toggle";

export default function Navbar({}): any {
  return (
    <nav className="w-full backdrop-blur-md bg-opacity-30 z-50 fixed h-24 flex justify-between items-center py-10 px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-24 border-b-2">
      <Link href="/">
        <Image
          alt="logo-dark"
          className="cursor-pointer w-40 hidden dark:block"
          src="/logo.svg"
          height={100}
          width={170}
        />
        <Image
          alt="logo-light"
          className="cursor-pointer w-40 dark:hidden"
          src="/logo.svg"
          height={100}
          width={170}
        />
      </Link>
      <div className="gap-1 md:gap-2 lg:gap-4 hidden md:flex">
        <Button variant="ghost" className="font-semibold text-md">
          <Link href="/">Home</Link>
        </Button>
        <Link href="/about">
          <Button variant="ghost" className="font-semibold text-md">
            About
          </Button>
        </Link>
        <Link href="/privacy-policy">
          <Button variant="ghost" className="font-semibold text-md">
            Privacy Policy
          </Button>
        </Link>
        <ThemeToggle />
      </div>
      <div className="flex space-x-4">
        <Link href="/sign-in">
          <Button
            variant="default"
            className="rounded-full w-fit bg-primary gap-2 items-center hidden md:flex"
            size="lg"
          >
            <span>Sign in</span>
            <span className="text-xl">
              <RiUserShared2Fill />
            </span>
          </Button>
        </Link>
        <Link
          href="https://github.com/rajarshisamaddar/unicever-2024"
          target="_blank"
        >
          <Button
            variant="secondary"
            className="rounded-full w-fit bg-secondary gap-2 items-center hidden md:flex"
            size="lg"
          >
            <span>GitHub</span>
            <span className="text-xl">
              <BsGithub />
            </span>
          </Button>
        </Link>
      </div>

      {/* MOBILE NAV */}
      <Sheet>
        <SheetTrigger className="block md:hidden p-3">
          <span className="text-2xl">
            <GrMenu />
          </span>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetDescription>
              <section className="flex flex-col items-center justify-center h-screen space-y-[15rem]">
                <div className="w-full space-y-3">
                  <Link href="/">
                    <Button
                      variant="link"
                      className="font-semibold text-md w-full"
                    >
                      Home
                    </Button>
                  </Link>
                  <Link href="/documentation">
                    <Button
                      variant="link"
                      className="font-semibold text-md w-full"
                    >
                      Documentation
                    </Button>
                  </Link>
                  <Link href="/privacy-policy">
                    <Button
                      variant="link"
                      className="font-semibold text-md w-full"
                    >
                      Privacy Policy
                    </Button>
                  </Link>
                  <ThemeToggle variant="link" />
                </div>
                <div className="w-full flex flex-col items-center space-y-4">
                  <Link href="/sign-in">
                    <Button
                      variant="default"
                      className="rounded-full w-fit bg-primary gap-2 items-center flex"
                      size="lg"
                    >
                      <span>Sign in</span>
                      <span className="text-xl">
                        <RiUserShared2Fill />
                      </span>
                    </Button>
                  </Link>
                  <Link
                    href="https://github.com/rajarshisamaddar/unicever-2024"
                    target="_blank"
                  >
                    <Button
                      variant="secondary"
                      className="rounded-full w-fit bg-secondary gap-2 items-center flex"
                      size="lg"
                    >
                      <span>GitHub</span>
                      <span className="text-xl">
                        <BsGithub />
                      </span>
                    </Button>
                  </Link>
                </div>
              </section>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
