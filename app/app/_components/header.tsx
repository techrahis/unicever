import { ThemeToggle } from "@/components/shared/theme-toggle";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

export default function DashboardHeader() {
  return (
    <header className="flex justify-between p-4 bg-secondary shadow-md dark:bg-gray-800">
      <h1 className="text-2xl font-bold">Unicever</h1>
      <section className="flex space-x-2 items-center">
        <UserButton showName={true} afterSignOutUrl="/" />
        <ThemeToggle />
      </section>
    </header>
  );
}
