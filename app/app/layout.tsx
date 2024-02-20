import NavBar from "@/app/app/_components/nav-bar";
export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="">
      <NavBar />
      {children}
    </main>
  );
}
