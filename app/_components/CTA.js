"use client";

import { motion } from "framer-motion";
import { SignInButton } from "@clerk/nextjs";
import useFramerMotion from "../_utils/useFramerMotion";

export default function CTA() {
  const { capsuleVariants } = useFramerMotion();

  return (
    <section className=" p-8 text-center my-12">
      <h2 className="text-4xl font-bold mb-4 text-primary-100">
        Ready to Relive Your <span className="text-accent-400">Memories?</span>
      </h2>
      <p className="text-lg text-primary-200 mb-6">
        Start creating and sharing your special capsules with friends and family
        today.
      </p>

      <motion.div
        variants={capsuleVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <SignInButton className="bg-accent-500 hover:bg-accent-600 text-primary-50 py-3 px-8 rounded-lg text-lg font-semibold">
          Get Started Now
        </SignInButton>
      </motion.div>
    </section>
  );
}
