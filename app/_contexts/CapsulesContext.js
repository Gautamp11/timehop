"use client";
const { createContext, useState, useContext } = require("react");

// Sample data for capsules
const capsulesData = [
  {
    id: "capsule1",
    capsuleName: "Birthday Surprise",
    capsuleDescription:
      "A special digital time capsule containing messages, photos, and videos from friends and family to be opened on your birthday!",
    owner: "user123",
    sharedWith: ["user456", "user789"],
    unlockDate: new Date("2025-06-30").toISOString(),
    capsuleData: {
      type: "message",
      content: "Happy Birthday! Hope you have a fantastic year ahead.",
    },
    sharedByMe: false,
    sharedWithMe: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "capsule2",
    capsuleName: "Travel Adventures",
    capsuleDescription:
      "A collection of travel stories, photos, and recommendations from my journeys around the world.",
    owner: "user123",
    sharedWith: [],
    unlockDate: new Date("2025-01-30").toISOString(),
    capsuleData: {
      type: "photoAlbum",
      content: [
        "https://example.com/photo1.jpg",
        "https://example.com/photo2.jpg",
      ],
    },
    sharedByMe: true,
    sharedWithMe: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "capsule3",
    capsuleName: "Graduation Day",
    capsuleDescription:
      "A digital memory capsule with congratulatory messages, photos, and videos from family and friends.",
    owner: "user456",
    sharedWith: ["user123"],
    unlockDate: new Date("2025-10-30").toISOString(),
    capsuleData: {
      type: "video",
      content: "https://example.com/graduation-video.mp4",
    },
    sharedByMe: false,
    sharedWithMe: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "capsule4",
    capsuleName: "Wedding Memories",
    capsuleDescription:
      "Cherish the moments of your special day with photos, videos, and heartfelt messages from loved ones.",
    owner: "user789",
    sharedWith: ["user123", "user456"],
    unlockDate: new Date("2025-03-30").toISOString(),
    capsuleData: {
      type: "photoAlbum",
      content: [
        "https://example.com/wedding-photo1.jpg",
        "https://example.com/wedding-photo2.jpg",
      ],
    },
    sharedByMe: false,
    sharedWithMe: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "capsule5",
    capsuleName: "Family Traditions",
    capsuleDescription:
      "A digital time capsule documenting family recipes, traditions, and stories.",
    owner: "user123",
    sharedWith: ["user456"],
    unlockDate: new Date("2025-05-30").toISOString(),
    capsuleData: {
      type: "note",
      content: "Grandma's secret apple pie recipe: ...",
    },
    sharedByMe: true,
    sharedWithMe: false,
    createdAt: new Date().toISOString(),
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
