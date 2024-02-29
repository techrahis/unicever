import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersonIcon, BackpackIcon } from "@radix-ui/react-icons";
import AccountCard from "@/app/app/profile/_components/account-card";
import OrganizationCard from "@/app/app/profile/_components/organization-card";
import { getOrganization } from "@/server/organization-crud";

export default async function Settings() {
  const session = await auth();
  const fetchedUser = await prisma.user.findUnique({
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

  const organization = await getOrganization(fetchedUser?.id as string);
  //console.log(organization)
  return (
    <div className="">
      <h1 className="text-4xl font-semibold">Profile</h1>
      <Tabs defaultValue="account" className="mt-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">
            <span className="flex items-center">
              <PersonIcon className="w-4 h-4 mr-2" />
              Account
            </span>
          </TabsTrigger>
          <TabsTrigger value="organization">
            <span className="flex items-center">
              <BackpackIcon className="w-4 h-4 mr-2" />
              Organization
            </span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <AccountCard user={fetchedUser} />
        </TabsContent>
        <TabsContent value="organization">
          <OrganizationCard userId={fetchedUser?.id} organizationDetails={organization} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
