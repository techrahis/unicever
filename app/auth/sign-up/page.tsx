import SignUpForm from "./_components/sign-up-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unicever - Sign Up",
  description:
    "Unicever is a certificate verification website used to attach verify link in certificate to ensure certificates legitimacy",
};

export default function SignUpPage() {
  return (
    <div>
      <SignUpForm />
    </div>
  );
}
