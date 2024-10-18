export default function Features() {
  const featuresData = [
    {
      title: "Secure Storage",
      description:
        "Your memories are locked away in a safe digital vault, far from prying eyes.",
      icon: "🔒", // Replace with an icon component or image
    },
    {
      title: "Easy Sharing",
      description:
        "With just a click, share your capsules with friends and family, creating bonds that last.",
      icon: "📤", // Replace with an icon component or image
    },
    {
      title: "Engaging Experience",
      description:
        "Relive your precious moments through interactive timelines that bring your memories to life.",
      icon: "📅", // Replace with an icon component or image
    },
  ];

  return (
    <section className="flex flex-col justify-center py-8 my-12" id="features">
      <h2 className="text-4xl font-bold text-accent-400 text-center mb-8">
        <span className="text-primary-100">Why</span> Choose Time Hop?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuresData.map((feature, index) => (
          <div
            key={index}
            className="bg-primary-700 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-2xl font-semibold text-accent-400">
              {feature.title}
            </h3>
            <p className="mt-2 text-primary-300">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
