import DashboardNav from "@/app/app/_components/nav-bar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="">
      <DashboardNav />
      {children}
    </main>
  );
}
