import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function DashboardNav() {
  return (
    <nav className="flex justify-between p-4 bg-secondary shadow-md dark:bg-gray-800">
      <Link href="/app">
        <h1 className="text-2xl font-bold">Unicever</h1>
      </Link>
      <section className="flex space-x-4 items-center">
        <UserButton showName={true} afterSignOutUrl="/" />
      </section>
    </nav>
  );
}
