import { getCapsuleById } from "@/actions";
import { CapusleDetails } from "@/app/_components/CapsuleDetails";
import Link from "next/link";
import { Suspense } from "react";
// import { useState, useEffect } from "react";

export default async function Page({ params }) {
  const { id } = params;
  const { data: capsule, error } = await getCapsuleById(id);

  return (
    <Suspense
      fallback={
        <div className="text-2xl font-semibold text-primary-50 mt-2">
          Loading Capsule...
        </div>
      }
    >
      <CapusleDetails capsule={capsule} error={error} />
    </Suspense>
  );
}
