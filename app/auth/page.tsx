import type { Metadata } from "next";
import AuthForm from "@/components/pages/auth/AuthForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-utils";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign up for a new account",
};

export default async function SignUp() {
  const session = await getServerSession(authOptions);
  if (session) {
    return redirect("/dashboard");
  }
  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <Card className="mx-5 max-w-[30rem]">
        <CardHeader>
          <CardTitle>Please sign in</CardTitle>
          <CardDescription>
            We only support highly secure authentication methods like magic
            links and OTPs. We don&apos;t store your password. We are committed
            to your privacy.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <AuthForm />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
