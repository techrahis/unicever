import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p className="text-xl font-bold">
        UNICEVER is an open-source project that revolutionizes certificate
        authentication and verification. Empower educational institutions and
        organizations to issue and validate tamper-proof digital credentials
        effortlessly. Implement secure issuance, automated verification, and
        user-friendly access.
      </p>
      <Image
        src="/logo.svg"
        alt="Unicever Logo"
        width={350}
        height={350}
        className="mt-4"
      />
    </main>
  );
}
