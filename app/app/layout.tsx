import DashboardNav from "@/app/app/_components/nav-bar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="">
      <DashboardNav />
      <main className="mx-10 mt-20">{children}</main>
    </main>
  );
}
