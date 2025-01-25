import { redirect } from "next/navigation";
import HomePage from "./_components/HomePage";
import { auth, currentUser } from "@clerk/nextjs/server";
import { syncUserFromClerk } from "./services/supabaseService";

export const metadata = {
  name: "TimeHop",
};

export default async function Page() {
  const { userId } = auth();

  const user = await currentUser();

  if (user) {
    const { id, imageUrl, username, firstName, lastName, emailAddresses } =
      user;

    // Sync user to Supabase
    await syncUserFromClerk({
      id,
      imageUrl,
      username,
      firstName,
      lastName,
      email: emailAddresses?.[0]?.emailAddress, // Safely handle array
    });

    // Redirect if the user is signed in
    redirect("/dashboard");
  }

  // Otherwise, return the homepage
  return <HomePage />;
}
