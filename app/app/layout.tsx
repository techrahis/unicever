import NavBar from "@/app/app/_components/nav-bar";
export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="px-4 md:px-8 max-w-screen-lg pb-10 mx-auto space-y-12">
      <NavBar />
      {children}
    </main>
  );
}
