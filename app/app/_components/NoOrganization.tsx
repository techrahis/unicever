import { buttonVariants } from "@/components/ui/button";
import emptyorg from "@/public/emptyorg.svg";
import Image from "next/image";
import Link from "next/link";
const NoOrganization = () => {
  return (
    <div className="h-[80vh] w-full flex justify-center items-center">
      <div className="flex justify-center items-center flex-col gap-1">
        <div className="md:h-[16rem] md:w-[16rem] h-[10rem] w-[10rem] overflow-hidden relative">
          <Image src={emptyorg} fill alt="empty-org" />
        </div>
        <div className="flex justify-center items-center flex-col">
          <p className="text-sm text-muted-foreground text-center">
            New Here, Go to Profile and fill the organization<br /> data and save to create event
          </p>
          <p className="text-blue-700">Or,</p>
          <Link
            href="/app/profile"
            className={buttonVariants({ variant: "link" })}
          >
            Take me to profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NoOrganization;
