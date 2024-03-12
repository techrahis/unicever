import { buttonVariants } from "@/components/ui/button";
import NoOrganizationImage from "@/public/no-organization.png";
import Image from "next/image";
import Link from "next/link";
const NoOrganization = () => {
  return (
    <div className="h-[80vh] w-full flex justify-center items-center flex-col gap-4">
      <Image src={NoOrganizationImage} width={300} height={300} alt="no" />
      <p className="text-sm text-muted-foreground">
        Create Organization to add Events
      </p>
      <Link href="/app/profile" className={buttonVariants({ variant: "link" })}>
        Create Organization
      </Link>
    </div>
  );
};

export default NoOrganization;
