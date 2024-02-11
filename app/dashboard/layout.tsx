import DashboardFooter from "@/components/pages/dashboard/footer";
import DashboardHeader from "@/components/pages/dashboard/header";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <DashboardHeader />
      {children}
      <DashboardFooter />
    </main>
  );
}
