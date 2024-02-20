import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
export default async function Page() {
  const session = await auth();
  return (
    <div>
      <h1>Application Page</h1>
      <p>
        This is a page that is protected by authentication. You can only see
        this page if you are logged in.
      </p>
      <p>{JSON.stringify(session)}</p>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button type="submit">Sign out</Button>
      </form>
    </div>
  );
}
