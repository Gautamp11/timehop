import { useMemo } from "react";

export default function useFilteredCapsules({
  activeCategory,
  capsules,
  sharedCapsules,
  userId,
}) {
  if (activeCategory === "myCapsules") {
    // Show capsules created by the current user
    return capsules.filter((capsule) => capsule.ownerId === userId);
  } else if (activeCategory === "sharedWithMe") {
    // Filter shared capsules for the current user

    const sharedCapsuleIds = sharedCapsules
      .filter((shared) => shared.sharedWith === userId)
      .map((shared) => shared.capsuleId);

    // Filter capsules based on shared capsule IDs
    return capsules.filter((capsule) => sharedCapsuleIds.includes(capsule.id));
  } else if (activeCategory === "sharedByMe") {
    // Show capsules shared by the current user
    const sharedCapsuleIds = sharedCapsules
      .filter((shared) => shared.sharedBy === userId)
      .map((shared) => shared.capsuleId);
    return capsules.filter((capsule) => sharedCapsuleIds.includes(capsule.id));
  }
  return [];
}
