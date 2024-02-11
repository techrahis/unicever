import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import { FC } from "react";

export default function PrivateRoute(Component: FC) {
  return async function (props: any) {
    const session = await getServerSession(authOptions);
    if (!session) {
      return redirect("/auth");
    }

    return <Component {...props} />;
  };
}
