"use client";
import { useCapsules } from "@/app/_contexts/CapsulesContext";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Page({ params }) {
  const { id } = params;
  const { capsules } = useCapsules();

  const locked = true;

  const capsule = capsules.find((capsule) => capsule.id == id);

  if (!capsule) {
    return (
      <div className="text-primary-50 text-center">
        <h2 className="text-2xl font-semibold">Capsule not found</h2>
        <p>We're sorry, but we couldn't find the requested capsule.</p>
      </div>
    );
  }

  return (
    <div className="text-primary-50 flex flex-col items-center gap-8 w-full max-w-3xl mx-auto rounded-md p-6 bg-primary-700 shadow-lg mt-2">
      <h2 className="text-3xl font-semibold text-center text-primary-50">
        {capsule.title}
      </h2>

      <div className="flex flex-col gap-8 items-center sm:w-3/4 lg:w-1/2">
        <div className="flex flex-col items-center gap-6">
          <img
            src={capsule.image}
            alt={`${capsule.title} capsule`}
            className="w-36 h-36 rounded-lg shadow-xl transition-transform duration-300 hover:scale-105"
          />

          <p className="text-center text-primary-300 text-lg sm:text-xl">
            {capsule.description}
          </p>

          <div className="flex flex-col gap-4 items-center">
            {locked && (
              <>
                <button className="bg-accent-500 text-primary-50 py-2 px-4 rounded-md font-semibold hover:bg-accent-600 transition duration-200">
                  Unlocking in:{" "}
                  <span>
                    {capsule.unlockDate
                      ? Math.ceil(
                          (new Date(capsule.unlockDate) - Date.now()) /
                            (1000 * 60 * 60 * 24)
                        )
                      : "No date"}
                    {" days"}
                  </span>
                </button>
                <Link
                  href="#"
                  className="bg-primary-500 text-primary-50 hover:bg-primary-600 transition-all py-2 px-4 rounded-md font-semibold"
                >
                  Request Owner to unlock early
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <Link
        href="/dashboard"
        className="text-lg text-primary-50 bg-accent-500 py-2 px-6 rounded-md hover:bg-accent-600 transition duration-200"
      >
        Go Back to Dashboard
      </Link>
    </div>
  );
}
