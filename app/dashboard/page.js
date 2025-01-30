import { getAllCapsules, getSharedCapsules } from "@/actions";
import Dashboard from "../_components/Dashboard";
import { auth } from "@clerk/nextjs/server";

export default async function Page() {
  const { userId } = auth();
  try {
    // Server-side data fetching here
    const capsules = await getAllCapsules();
    const sharedCapsules = await getSharedCapsules(userId);

    return (
      <Dashboard
        capsules={capsules}
        sharedCapsules={sharedCapsules}
        userId={userId}
      />
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Error loading data.</div>;
  }
}
