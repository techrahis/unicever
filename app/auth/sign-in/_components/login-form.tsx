import { CardWrapper } from "@/app/auth/_components/card-wrapper";

export default function LoginForm() {
  return (
    <CardWrapper
      headerLabel="Welcome back!"
      backBtnLabel="Don't have an account? Sign up here."
      backBtnHref="/auth/sign-up"
      showSocial={true}
    >
      <p>Login form</p>
    </CardWrapper>
  );
}
