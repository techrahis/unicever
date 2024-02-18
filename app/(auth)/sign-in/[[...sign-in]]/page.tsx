import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Page() {
  return (
    <section className="bg-black flex justify-center items-center h-screen">
      <SignIn
        appearance={{
          baseTheme: dark,
        }}
      />
    </section>
  );
}
