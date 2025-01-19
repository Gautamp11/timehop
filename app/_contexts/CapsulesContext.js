"use client";
const { createContext, useState, useContext } = require("react");

// Sample data for capsules
const capsulesData = [
  {
    id: 1,
    title: "Birthday Surprise",
    description:
      "A special digital time capsule containing messages, photos, and videos from friends and family to be opened on your birthday!",
    image: "/capsule-image1.png", // Replace with your capsule image path
    created: true,
    sharedByMe: true,
    sharedWithMe: false,
    unlockDate: "2025-06-30",
  },
  {
    id: 2,
    title: "Travel Adventures",
    description:
      "A collection of travel stories, photos, and recommendations from my journeys around the world. Perfect for reliving those adventures!",
    image: "/capsule-image2.png", // Replace with your capsule image path
    created: true,
    sharedByMe: true,
    sharedWithMe: false,
    unlockDate: "2025-01-30",
  },
  {
    id: 3,
    title: "Graduation Day",
    description:
      "A digital memory capsule with congratulatory messages, photos, and videos from family and friends to celebrate this milestone!",
    image: "/capsule-image3.png", // Replace with your capsule image path
    created: true,
    sharedByMe: false,
    sharedWithMe: false,
    unlockDate: "2025-10-30",
  },
  {
    id: 4,
    title: "Wedding Memories",
    description:
      "Cherish the moments of your special day with a capsule filled with photos, videos, and heartfelt messages from loved ones.",
    image: "/capsule-image2.png", // Replace with your capsule image path
    created: false,
    sharedByMe: false,
    sharedWithMe: true,
    unlockDate: "2025-03-30",
  },
  {
    id: 5,
    title: "Family Traditions",
    description:
      "A digital time capsule documenting family recipes, traditions, and stories passed down through generations. Perfect for sharing with future family members!",
    image: "/capsule-image1.png", // Replace with your capsule image path
    created: false,
    sharedByMe: false,
    sharedWithMe: true,
    unlockDate: "2025-05-30",
  },
];
const CapsulesContext = createContext();

export const CapsulesProvider = ({ children }) => {
  const [capsules, setCapsules] = useState(capsulesData);

  const addCapsules = (data) => {
    setCapsules((prev) => [
      ...prev,
      {
        ...data,
        id: prev.length > 0 ? prev[prev.length - 1].id + 1 : 1, // Auto-generate unique ID
        created: true,
        sharedByMe: false,
        sharedWithMe: false,
      },
    ]);
  };

  return (
    <CapsulesContext.Provider value={{ capsules, setCapsules, addCapsules }}>
      {children}
    </CapsulesContext.Provider>
  );
};

export const useCapsules = () => useContext(CapsulesContext);
