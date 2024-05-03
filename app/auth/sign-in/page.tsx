import SignInForm from "./_components/sign-in-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unicever - Sign In",
  description:
    "Unicever is a certificate verification website used to attach verify link in certificate to ensure certificates legitimacy",
};
export default function SignInPage() {
  return (
    <div>
      <SignInForm />
    </div>
  );
}
