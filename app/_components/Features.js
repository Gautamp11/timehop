"use client";

import { motion } from "framer-motion";
import {
  FaTimeMachine,
  FaUsers,
  FaLock,
  FaHeart,
  FaHourglass,
} from "react-icons/fa";
import useFramerMotion from "../_utils/useFramerMotion";

export default function Features() {
  const { containerVariants, capsuleVariants } = useFramerMotion();

  const featuresData = [
    {
      name: "Time Travel",
      description:
        "Send messages, photos, and videos to your future self or loved ones. Relive memories when the time is right.",
      icon: <FaHourglass className="text-4xl mb-4 text-accent-400" />,
    },
    {
      name: "Shared Memories",
      description:
        "Collaborate with friends and family to create shared time capsules. Celebrate milestones together.",
      icon: <FaUsers className="text-4xl mb-4 text-accent-400" />,
    },
    {
      name: "Secure & Private",
      description:
        "Your memories are encrypted and stored securely. Only you and your chosen recipients can access them.",
      icon: <FaLock className="text-4xl mb-4 text-accent-400" />,
    },
    {
      name: "Emotional Journeys",
      description:
        "Experience the joy of rediscovering forgotten moments. Time Hop makes every memory special.",
      icon: <FaHeart className="text-4xl mb-4 text-accent-400" />,
    },
  ];

  return (
    <section className="flex flex-col justify-center py-8 my-12" id="features">
      <h2 className="text-4xl font-bold text-accent-400 text-center mb-8">
        <span className="text-primary-100">Why</span> Choose Time Hop?
      </h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }} // Trigger animation when 20% of the section is visible
      >
        {featuresData.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-primary-700 p-6 rounded-lg shadow-lg"
            variants={capsuleVariants}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.3 },
            }}
          >
            <div>{feature.icon}</div>
            <h3 className="text-2xl font-semibold text-accent-400">
              {feature.name}
            </h3>
            <p className="mt-2 text-primary-300">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
