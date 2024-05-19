import Image from "next/image";
import Navbar from "./_components/navbar";
import HomePage1 from "@/public/hompage1.svg";
import Banner1 from "@/public/banner1.jpg";
import Banner2 from "@/public/banner2.jpg";
import Banner3 from "@/public/banner3.jpg";
import AboutUs from "@/public/aboutus.png";
import Link from "next/link";
import { FaUserLock } from "react-icons/fa6";
import { ImProfile } from "react-icons/im";
import { FaSchool } from "react-icons/fa";
import { MdOutlineEventAvailable } from "react-icons/md";
import { GrCertificate } from "react-icons/gr";
import { BsArrowRight } from "react-icons/bs";
import { CgCornerDownLeft } from "react-icons/cg";
import { BsArrowDown } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
import { RiUserShared2Fill } from "react-icons/ri";
import { buttonVariants } from "@/components/ui/button";
export default function Home() {
  return (
    <main>
      <Navbar />
      <section className="mt-8 container mx-auto">
        {/* Intro section */}
        <div className="w-[80%] mx-auto mt-4">
          <div className="w-full h-fit p-4 flex justify-center gap-4">
            <div
              className="h-20 w-20 md:h-40 md:w-40 lg:h-72 lg:w-72 overflow-hidden relative  
            shadow-2xl shadow-gray-600 -rotate-12 dark:shadow-indigo-600/20
            bg-gray-400"
            >
              <Image src={Banner2} alt="banner1" fill />
            </div>
            <div
              className="h-24 w-24 md:h-48 md:w-48 lg:h-80 lg:w-80 overflow-hidden relative scale-125 z-[10] 
            shadow-2xl shadow-gray-600 dark:shadow-indigo-600/20 bg-gray-400"
            >
              <Image src={Banner1} alt="banner1" fill />
            </div>
            <div
              className="h-20 w-20 md:h-40 md:w-40 lg:h-72 lg:w-72 overflow-hidden relative  shadow-2xl 
            shadow-gray-600 rotate-12 dark:shadow-indigo-600/20 bg-gray-400"
            >
              <Image src={Banner3} alt="banner1" fill />
            </div>
          </div>
        </div>

        {/* Intro Section */}
        <div className="flex w-full justify-center items-center flex-col mt-16">
          <h1 className="text-5xl dark:text-gray-300 text-gray-600 font-bold font-Briem">
            UNICEVER
          </h1>
          <div className="h-20 w-20 overflow-hidden relative">
            <Image src={HomePage1} fill alt="logo" />
          </div>
        </div>

        {/* About Us */}
        <div className="my-8 w-[90%] mx-auto">
          <div className="w-full flex justify-center flex-col gap-1 items-center">
            <h1 className="text-4xl">About Us</h1>
            <h3 className="text-[#2563eb]">Who are we</h3>
          </div>

          <div className="mb-20">
            <div className="my-2 grid lg:grid-cols-[1fr,2fr] gap-8 justify-center items-center">
              <div
                className="w-auto lg:w-full h-[15rem] lg:h-[22rem] p-4 relative overflow-hidden rounded-md 
              flex justify-center items-center bg-gray-100 dark:bg-gray-400"
              >
                <Image
                  src={AboutUs}
                  alt="aboutus"
                  className="h-[90%] w-[90%]"
                />
              </div>
              <div>
                <p className="text-muted-foreground line-clamp-6">
                  UNICEVER, standing for United Certification Enhancement and
                  Verification, is a groundbreaking initiative driven by the
                  paramount objective of fortifying the authenticity of digital
                  certificates. In an era where the persistent challenges of
                  forgery and counterfeiting loom large, UNICEVER emerges as a
                  beacon of innovation and reliability. The core essence of this
                  initiative revolves around the development of a cutting-edge
                  open-source tool designed to revolutionize the verification
                  process for digital certificates.unicever is an open-source
                  project that revolutionizes certificate authentication and
                  verification. Empower educational institutions and
                  organizations to issue and validate tamper-proof digital
                  credentials effortlessly. Implement secure issuance, automated
                  verification, and user-friendly access.
                </p>

                <Link href="/about" className="text-[#2563eb] underline">
                  more
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="my-8 w-[90%] mx-auto">
          <div className="w-full flex justify-center flex-col gap-1 items-center">
            <h1 className="text-4xl">Workflow</h1>
            <h3 className="text-[#2563eb]">How unicever works</h3>
          </div>

          <div className="w-full mx-auto my-8">
            <p className="text-muted-foreground text-lg">
              A Free tool that will verify your certificate in seconds. All you
              have to do is follow the easy process
            </p>
            <div className="my-8 grid grid-cols-5 gap-4 items-center w-full">
              <div className="flex justify-center flex-col items-center gap-2">
                <FaUserLock className="text-[5rem]" />
                <p className="text-sm text-muted-foreground">Login / Signup</p>
              </div>
              <BsArrowRight className="text-xl text-[#2563eb]" />
              <div className="flex justify-center flex-col items-center gap-2">
                <ImProfile className="text-[5rem]" />
                <p className="text-sm text-muted-foreground">
                  Complete Your Profile
                </p>
              </div>
              <BsArrowRight className="text-xl text-[#2563eb]" />
              <div className="flex justify-center flex-col items-center gap-2">
                <FaSchool className="text-[5rem]" />
                <p className="text-sm text-muted-foreground">
                  Add Your Organization
                </p>
              </div>
            </div>
            <div className="my-4 flex justify-end mr-24">
              <CgCornerDownLeft className="text-xl text-[#2563eb]" />
            </div>

            <div className="flex w-full justify-center items-center gap-14 my-4 flex-col">
              <div className="flex justify-center flex-col items-center gap-2">
                <MdOutlineEventAvailable className="text-[5rem]" />
                <p className="text-sm text-muted-foreground">Add events</p>
              </div>
              <BsArrowDown className="text-xl text-[#2563eb]" />
              <div className="flex justify-center flex-col items-center gap-2">
                <GrCertificate className="text-[5rem]" />
                <p className="text-sm text-muted-foreground">
                  Go to events and add certificates for verification
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* footer */}
      <footer className="mt-12 shadow-2xl shadow-gray-400 dark:shadow-indigo-500/20 w-full h-fit p-4 px-8 border-t">
        <div className="flex w-full flex-col items-start md:flex-row justify-between lg:items-center">
          <div className="w-36 h-36 relative overflow-hidden">
            <Image
              className="hidden dark:block"
              fill
              alt="logo-dark"
              src="/logo-dark.svg"
            />
            <Image
              className="dark:hidden block"
              fill
              alt="logo-light"
              src="/logo-light.svg"
            />
          </div>
          <div className="flex flex-col justify-center gap-4 text-sm cursor-pointer">
            <Link
              href="/"
              className="flex items-center gap-2 hover:text-[#2563eb] transition"
            >
              Home
              <BsArrowRight />
            </Link>
            <Link
              href="/about"
              className="flex items-center gap-2 hover:text-[#2563eb] transition"
            >
              About <BsArrowRight />
            </Link>
            <Link
              href="/privacy-policy"
              className="flex items-center gap-2 hover:text-[#2563eb] transition"
            >
              Privacy Policy <BsArrowRight />
            </Link>
          </div>

          <div className="flex mt-12 lg:mt-0 items-center justify-center gap-4 ">
            <Link
              href="https://github.com/rajarshisamaddar/unicever-2024"
              target="_blank"
              className={buttonVariants({
                variant: "link",
                className: "flex justify-center gap-2 text-lg",
              })}
            >
              <BsGithub className="text-2xl" />
              <p>Github</p>
            </Link>
            <Link
              href="/auth/login"
              className={buttonVariants({
                variant: "link",
                className: "flex justify-center gap-2 text-lg",
              })}
            >
              <RiUserShared2Fill className="text-2xl" />
              <p>Sign in</p>
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
