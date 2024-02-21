import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersonIcon, BackpackIcon } from "@radix-ui/react-icons";
import AccountCard from "@/app/app/profile/_components/account-card";
import OrganizationCard from "@/app/app/profile/_components/organization-card";

export default async function Settings() {
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
          <AccountCard />
        </TabsContent>
        <TabsContent value="organization">
          <OrganizationCard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
