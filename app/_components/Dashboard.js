// export default function Dashboard() {
//   return (
//     <div className="py-8">
//       {/* Welcome Message */}
//       <h1 className="text-4xl font-bold text-primary-200 mb-4">
//         Welcome Back!
//       </h1>
//       <p className="text-lg text-primary-200 mb-6">
//         Let's relive some memories.
//       </p>

//       {/* Quick Access Buttons */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//         <button className="bg-accent-500 hover:bg-accent-600 text-primary-50 py-3 rounded-lg">
//           Create a New Capsule
//         </button>
//         <button className="bg-accent-500 hover:bg-accent-600 text-primary-50 py-3 rounded-lg">
//           View My Capsules
//         </button>
//         <button className="bg-accent-500 hover:bg-accent-600 text-primary-50 py-3 rounded-lg">
//           Explore Shared Capsules
//         </button>
//       </div>

//       {/* Recent Activity */}
//       <section className="mb-8">
//         <h2 className="text-2xl font-bold text-primary-50 mb-4">
//           Recent Activity
//         </h2>
//         <ul className="list-disc list-inside text-primary-200">
//           <li>Created Capsule: "Trip to Paris"</li>
//           <li>Received Capsule: "Birthday Surprise"</li>
//           <li>Shared Capsule: "Graduation Memories"</li>
//         </ul>
//       </section>

//       {/* Featured Capsules */}
//       <section>
//         <h2 className="text-2xl font-bold text-primary-50 mb-4">
//           Featured Capsules
//         </h2>
//         {/* Placeholder for featured capsules, could be a grid or carousel */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {/* Example Capsule Card */}
//           <div className="bg-primary-700 p-4 rounded-lg">
//             <h3 className="text-lg text-primary-50">Vacation in Hawaii</h3>
//             <p className="text-primary-200">
//               Explore the memories from our unforgettable trip!
//             </p>
//           </div>
//           {/* More capsule cards can be added here */}
//         </div>
//       </section>
//     </div>
//   );
// }

"use client";
import Image from "next/image";
import { useState } from "react";

export default function Dashboard() {
  const [activeCategory, setActiveCategory] = useState("myCapsules"); // Default category

  // Sample data for capsules
  const capsules = [
    {
      id: 1,
      title: "Birthday Surprise",
      description:
        "A special digital time capsule containing messages, photos, and videos from friends and family to be opened on your birthday!",
      image: "/capsule-image1.png", // Replace with your capsule image path
    },
    {
      id: 2,
      title: "Travel Adventures",
      description:
        "A collection of travel stories, photos, and recommendations from my journeys around the world. Perfect for reliving those adventures!",
      image: "/capsule-image2.png", // Replace with your capsule image path
    },
    {
      id: 3,
      title: "Graduation Day",
      description:
        "A digital memory capsule with congratulatory messages, photos, and videos from family and friends to celebrate this milestone!",
      image: "/capsule-image3.png", // Replace with your capsule image path
    },
    {
      id: 4,
      title: "Wedding Memories",
      description:
        "Cherish the moments of your special day with a capsule filled with photos, videos, and heartfelt messages from loved ones.",
      image: "/capsule-image2.png", // Replace with your capsule image path
    },
    {
      id: 5,
      title: "Family Traditions",
      description:
        "A digital time capsule documenting family recipes, traditions, and stories passed down through generations. Perfect for sharing with future family members!",
      image: "/capsule-image1.png", // Replace with your capsule image path
    },
  ];

  // Function to handle category switch
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    // You may fetch or filter capsules based on the selected category here
  };

  return (
    <div className="p-8">
      {/* Category Switcher */}
      <div className="flex justify-around mb-6">
        <button
          className={`py-2 px-4 rounded-lg ${
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
        {capsules.map((capsule) => (
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
              <button className="mt-2 bg-accent-500 hover:bg-accent-600 text-primary-50 py-1 px-3 rounded-lg">
                Open Capsule
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
