import Link from "next/link";
import { useEffect, useState, useMemo } from "react";

function Capsules({ activeCategory, handleCategoryChange, capsules }) {
  const filteredCapsules = useMemo(() => {
    switch (activeCategory) {
      case "myCapsules":
        return capsules.filter((capsule) => capsule.created);
      case "sharedByMe":
        return capsules.filter((capsule) => capsule.sharedByMe);
      case "sharedWithMe":
        return capsules.filter((capsule) => capsule.sharedWithMe);
      default:
        return capsules;
    }
  }, [activeCategory, capsules]);

  return (
    <div className="p-8">
      {/* Category Switcher */}
      <div className="flex justify-around mb-6">
        <button
          className={`trans py-2 px-4 rounded-lg ${
            activeCategory === "myCapsules"
              ? "bg-accent-500 text-primary-50"
              : "bg-primary-800 text-primary-200"
          }`}
          onClick={() => handleCategoryChange("myCapsules")}
        >
          My Capsules
        </button>
        <button
          className={`py-2 px-4 rounded-lg ${
            activeCategory === "sharedWithMe"
              ? "bg-accent-500 text-primary-50"
              : "bg-primary-800 text-primary-200"
          }`}
          onClick={() => handleCategoryChange("sharedWithMe")}
        >
          Shared With Me
        </button>
        <button
          className={`py-2 px-4 rounded-lg ${
            activeCategory === "sharedByMe"
              ? "bg-accent-500 text-primary-50"
              : "bg-primary-800 text-primary-200"
          }`}
          onClick={() => handleCategoryChange("sharedByMe")}
        >
          Shared By Me
        </button>
      </div>

      {/* Capsules Section */}
      <div className="grid grid-cols-1 gap-8">
        {filteredCapsules.map((capsule) => (
          <div
            key={capsule.id}
            className="relative bg-primary-700 p-4 rounded-lg shadow-lg flex "
          >
            <img
              src={capsule.image}
              alt={capsule.title}
              className=" max-h-32 rounded-lg mr-4 "
            />
            <div className="flex-1">
              <h2 className="text-xl font-bold text-primary-50">
                {capsule.title}
              </h2>
              <p className="text-primary-200">{capsule.description}</p>
              <Link
                href={`/dashboard/capsules/${capsule.id}`}
                className="mt-2 bg-accent-500 hover:bg-accent-600 text-primary-50 py-1 px-3 rounded-lg"
              >
                Open Capsule
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Capsules;
