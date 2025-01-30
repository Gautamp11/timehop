import Link from "next/link";
import { motion } from "framer-motion";
import { Suspense } from "react";
import Loading from "../dashboard/loading";

function Capsules({
  activeCategory,
  handleCategoryChange,
  capsules,
  onShareCapsule,
  onEditCapsule,
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const capsuleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="p-8">
      {/* Category Switcher */}
      <div className="flex justify-around mb-6">
        {["myCapsules", "sharedWithMe", "sharedByMe"].map((category) => (
          <motion.button
            key={category}
            // whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`py-2 px-4 rounded-lg transition-colors duration-300 ${
              activeCategory === category
                ? "bg-accent-500 text-primary-50"
                : "bg-primary-800 text-primary-200"
            }`}
            onClick={() => handleCategoryChange(category)}
          >
            {category
              .replace(/([A-Z])/g, " $1")
              .trim()
              .toUpperCase()}
          </motion.button>
        ))}
      </div>

      {/* Capsules Section */}
      <motion.div
        className="grid grid-cols-1 gap-8 w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {capsules.length > 0 ? (
          capsules.map((capsule) => (
            <motion.div
              key={capsule.id}
              variants={capsuleVariants}
              className="relative bg-primary-700 p-4 rounded-lg shadow-lg flex space-y-2"
            >
              <img
                src="/capsule-1.png"
                alt={capsule.name}
                className="max-h-32 rounded-lg mr-4"
              />
              <div className="flex-1">
                <h2 className="text-xl font-bold text-primary-50">
                  {capsule.name}
                </h2>
                <p className="text-primary-200 mb-2">{capsule.description}</p>
                <div className="space-x-2">
                  <Suspense fallback={<p>Loading Capsule...</p>}>
                    <Link
                      key={capsule.id}
                      href={`/dashboard/capsules/${capsule.id}`}
                      prefetch
                      className="bg-accent-500 hover:bg-accent-600 text-primary-50 py-1 px-3 rounded-lg transition-all"
                    >
                      Open Capsule
                    </Link>
                  </Suspense>
                  <motion.button
                    // whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onShareCapsule(capsule.id)}
                    className="bg-primary-500 hover:bg-accent-600 text-primary-50 py-1 px-3 rounded-lg transition-all"
                  >
                    Share Capsule
                  </motion.button>
                  <motion.button
                    // whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onEditCapsule(capsule)}
                    className="bg-accent-500 hover:bg-accent-600 text-primary-50 py-1 px-3 rounded-lg transition-all"
                  >
                    Edit Capsule
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-primary-50 text-xl font-bold mt-8 text-center"
          >
            No Capsules to show
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default Capsules;
