import AuthProvider from "@/components/shared/auth-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Unicever",
    template: "%s | Unicever",
  },
  description: "Unicever is an online certificate validator application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en" className="dark">
        <body className={inter.className}>
          {children}
          <Toaster />
        </body>
      </html>
    </AuthProvider>
  );
}
