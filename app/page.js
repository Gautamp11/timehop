import { redirect } from "next/navigation";
import Dashboard from "./_components/Dashboard";
import HomePage from "./_components/HomePage";
import { auth, currentUser } from "@clerk/nextjs/server";

export const metadata = {
  title: "TimeHop",
};

export default async function Page() {
  // Get the userId from auth() -- if null, the user is not signed in
  const { userId } = auth();

  return <>{userId ? redirect("/dashboard") : <HomePage />}</>;
}
