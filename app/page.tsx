import Link from "next/link";
export default function Home() {
  return (
    <main className="h-screen">
      <h1 className="">Home page of Unicever</h1>
      <h2>
        Navigate back to{" "}
        <Link href="/app" className="font-bold text-primary underline">
          UNICEVER WEB APPLICATION
        </Link>
      </h2>
    </main>
  );
}
