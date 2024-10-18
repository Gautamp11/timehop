import Link from "next/link";

const capsules = [
  {
    id: 1,
    title: "My First Capsule",
    description: "A memory from my childhood",
    date: "2024-01-01",
    image: "capsule-1.png", // Add your image path here
    category: "created", // "created", "received", "shared"
  },
  {
    id: 2,
    title: "Travel Memories",
    description: "Trips I've taken around the world",
    date: "2024-05-15",
    image: "capsule-1.png", // Add your image path here
    category: "received", // "created", "received", "shared"
  },
  {
    id: 3,
    title: "Shared Capsule",
    description: "A capsule shared with me.",
    date: "2024-06-10",
    image: "capsule-1.png", // Add your image path here
    category: "shared", // "created", "received", "shared"
  },
  // Add more capsules as needed
];

export default function Page() {
  return (
    <div className="m-4 bg-primary-700 p-4 rounded-lg">
      <h1 className="text-3xl font-bold text-primary-50 mb-4">My Capsules</h1>

      <Link href="/create-capsule">
        <button className="mb-4 bg-accent-500 text-primary-50 p-2 rounded-md hover:bg-accent-600">
          Create New Capsule
        </button>
      </Link>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {capsules.map((capsule) => (
          <div
            key={capsule.id}
            className="bg-primary-800 p-4 rounded-lg shadow-md"
          >
            <img
              src={capsule.image}
              alt={capsule.title}
              className="h-32 w-full object-cover rounded-md mb-2"
            />
            <h2 className="text-xl font-semibold text-primary-50">
              {capsule.title}
            </h2>
            <p className="text-primary-200">{capsule.description}</p>
            <p className="text-sm text-primary-300">
              Created on: {capsule.date}
            </p>
            <div className="mt-2 flex justify-between">
              <Link
                href={`/capsule/${capsule.id}`}
                className="text-accent-400 hover:underline"
              >
                View
              </Link>
              <Link
                href={`/capsule/edit/${capsule.id}`}
                className="text-accent-400 hover:underline"
              >
                Edit
              </Link>
              <button className="text-accent-400 hover:underline">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
