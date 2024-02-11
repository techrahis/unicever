import type { Metadata } from "next";
import SignUpForm from "@/components/page/signup/SignUpForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign up for a new account",
};

export default function SignUp() {
  return (
    <main className="flex flex-col justify-center items-center h-screen">
      {/* <h1 className="text-center text-4xl font-bold mb-6">Unicever</h1> */}
      <span className="w-72 sm:w-96 text-left mb-6">
        <h2 className="text-2xl font-semibold">Create account</h2>
        <p>Let&apos;s get you started with your account</p>
      </span>
      <SignUpForm />
      <p className="mt-4">
        Already have an account?{" "}
        <Link className="text-primary" href="/signin">
          Sign in
        </Link>
      </p>
    </main>
  );
}
