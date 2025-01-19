export default function Hero() {
  return (
    <section className="hero relative h-screen flex flex-col justify-center items-center text-center">
      <h1 className="text-6xl font-bold text-accent-400 mb-4 z-10">
        Time <span className="text-primary-100">Hop</span>
      </h1>
      <p className="text-lg text-primary-200 mb-6 z-10">
        Jumping to the future with your memories. Create, explore, and share
        your time capsules.
      </p>
      <a
        href="#features"
        className="bg-accent-500 text-primary-50 py-2 px-4 rounded-lg hover:bg-accent-600 transition duration-300 z-10"
      >
        Start Your Journey
      </a>
      {/* Floating single capsule behind the text */}
      <img
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
      />{" "}
    </section>
  );
}
