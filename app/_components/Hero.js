"use client";
import { motion } from "framer-motion";
import useFramerMotion from "../_utils/useFramerMotion";
import Image from "next/image";

export default function Hero() {
  const { capsuleVariants } = useFramerMotion();

  return (
    <section
      className="hero relative h-screen flex flex-col justify-center !w-full items-center text-center overflow-hidden
    bg-gradient-to-tr from-primary-800 via-primary-800 to-accent-900  z-0
    "
    >
      {/* Gradient Background */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900 opacity-80 z-0"></div> */}

      {/* Floating Capsule */}
      <Image
        className="absolute w-48 animate-float"
        style={{
          top: "50%", // Center vertically (you can adjust this as needed)
          left: "50%", // Center horizontally (you can adjust this as needed)
          transform: "translate(-50%, -50%)", // Center the image
          zIndex: 0, // Ensure it is behind the text but in front of the background
          opacity: 0.7, //
        }}
        src="/capsule-1.png"
        alt="bg-capsule"
        width={192}
        height={192}
      />

      {/* Content */}
      <motion.div
        className="z-10"
        variants={capsuleVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-6xl font-bold text-accent-400 mb-4">
          Time <span className="text-primary-100">Hop</span>
        </h1>
        <p className="text-lg text-primary-200 mb-6">
          Jumping to the future with your memories. Create, explore, and share
          your time capsules.
        </p>

        <motion.div
          variants={capsuleVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <a
            href="#features"
            className="bg-accent-500 text-primary-50 py-2 px-4 rounded-lg hover:bg-accent-600 transition duration-300"
          >
            Start Your Journey
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
