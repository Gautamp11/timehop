"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import useFramerMotion from "../_utils/useFramerMotion";

const testimonials = [
  {
    id: 1,
    text: "This app helps me relive memories like never before!",
    author: "User 1",
  },
  {
    id: 2,
    text: "An amazing way to capture and share precious moments.",
    author: "User 2",
  },
  {
    id: 3,
    text: "The interface is simple, but it's packed with great features!",
    author: "User 3",
  },
];

export default function Testimonials() {
  const { capsuleVariants } = useFramerMotion();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000); // Auto-slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex flex-col items-center justify-center py-12 my-12 text-white">
      <h2 className="text-4xl font-bold text-center text-accent-400 p-6">
        What <span className="text-primary-100">People</span> Say
      </h2>

      <div className="relative w-full h-64 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="absolute w-full h-48 bg-gradient-to-b from-primary-800 to-primary-700  p-6 rounded-lg flex flex-col justify-around items-center shadow-sm"
            variants={capsuleVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.5 }}
          >
            <p className="text-xl text-gray-300 text-center">
              {testimonials[currentSlide].text}
            </p>
            <span className="text-lg text-accent-500 font-semibold">
              {testimonials[currentSlide].author}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
