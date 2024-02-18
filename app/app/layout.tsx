import DashboardFooter from "@/app/app/_components/footer";
import DashboardHeader from "@/app/app/_components/header";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="">
      <DashboardHeader />
      {children}
      <DashboardFooter />
    </main>
  );
}
