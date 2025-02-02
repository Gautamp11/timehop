import { getCapsuleById, getSharedWithList } from "@/actions";
import { CapusleDetails } from "@/app/_components/CapsuleDetails";
import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";

// import { useState, useEffect } from "react";

export default async function Page({ params }) {
  const { id } = params;
  const { data: capsule, error } = await getCapsuleById(id);
  const sharedWith = await getSharedWithList(id);
  console.log(sharedWith);

  const { userId } = auth();

  const isOwner = capsule?.ownerId === userId;

  return (
    <Suspense
      fallback={
        <div className="text-2xl font-semibold text-primary-50 mt-2">
          Loading Capsule...
        </div>
      }
    >
      <CapusleDetails
        capsule={capsule}
        error={error}
        isOwner={isOwner}
        sharedWith={sharedWith}
      />
    </Suspense>
  );
}
