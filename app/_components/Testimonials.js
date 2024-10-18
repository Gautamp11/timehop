"use client";
import { useState } from "react";

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
  // You can add more testimonials here
];

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = testimonials.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };
  return (
    <section className="flex flex-col justify-center py-8 my-12">
      <h2 className="text-4xl text-accent-400 p-8 font-bold text-center ">
        What <span className="text-primary-100">People</span> Say
      </h2>

      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="min-w-full h-48 bg-primary-700 p-14  rounded-lg flex flex-col justify-between items-center"
            >
              <p className="text-primary-200 text-xl">{testimonial.text}</p>
              <span className="text-accent-400 text-lg">
                {testimonial.author}
              </span>
            </div>
          ))}
        </div>
        <button
          onClick={prevSlide}
          className="mx-4 absolute -left-0 top-1/2 -translate-y-1/2 bg-accent-400 rounded-full p-2 font-bold  text-primary-900 hover:bg-accent-500"
        >
          &lt;
        </button>{" "}
        <button
          onClick={nextSlide}
          className="mx-4 absolute right-0 top-1/2 -translate-y-1/2 bg-accent-400 rounded-full p-2 font-bold  text-primary-900 hover:bg-accent-500 "
        >
          &gt;
        </button>
      </div>
    </section>
  );
}
