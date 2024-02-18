import DashboardFooter from "@/app/dashboard/_components/footer";
import DashboardHeader from "@/app/dashboard/_components/header";

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
