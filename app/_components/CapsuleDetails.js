import Link from "next/link";

export function CapusleDetails({ capsule, error }) {
  const locked =
    capsule?.unlockDate && new Date(capsule.unlockDate) > new Date(); // Determine if the capsule is locked
  const daysToUnlock = capsule?.unlockDate
    ? Math.ceil(
        (new Date(capsule.unlockDate) - Date.now()) / (1000 * 60 * 60 * 24)
      )
    : null;

  if (error)
    return (
      <div className="text-primary-50 font-bold text-xl mt-8">
        Error fetching capsule
      </div>
    );

  return (
    <div className="text-primary-50 flex flex-col items-center gap-8 w-full max-w-3xl mx-auto rounded-md p-4 bg-primary-700 shadow-lg mt-2">
      <h2 className="text-3xl font-semibold text-center text-primary-50">
        {capsule.name}
      </h2>

      <div className="flex flex-col gap-8 items-center sm:w-3/4 lg:w-1/2">
        <div className="flex flex-col items-center gap-6">
          <img
            src="/capsule-1.png"
            alt={`${capsule.name} capsule`}
            className="w-36 h-36 rounded-lg shadow-xl transition-transform duration-300 hover:scale-105"
          />

          <p className="text-center text-primary-300 text-md sm:text-lg">
            {capsule.description}
          </p>

          <div className="flex flex-col gap-4 items-center">
            {false ? (
              <>
                <button className="bg-accent-500 text-primary-50 py-2 px-4 rounded-md font-semibold hover:bg-accent-600 transition duration-200">
                  Unlocking in:{" "}
                  <span>
                    {daysToUnlock ? `${daysToUnlock} days` : "No date"}
                  </span>
                </button>
                <Link
                  href="#"
                  className="bg-primary-500 text-primary-50 hover:bg-primary-600 transition-all py-2 px-4 rounded-md font-semibold"
                >
                  Request Owner to unlock early
                </Link>
              </>
            ) : (
              <div className="text-center flex flex-col gap-2 bg-primary-600 rounded-md p-4 shadow-lg">
                <p className=" text-primary-50 font-bold text-xl mt-2 mb-2">
                  Capsule is unlocked!
                </p>
                <Link
                  href={`${capsule?.filePath}`}
                  className="text-md bg-accent-500 font-semibold max-w-fit mx-auto p-2 rounded-md hover:bg-accent-600 transition duration-200"
                >
                  Click to View your special capsule 🎁
                </Link>
                <h2 className="text-lg mt-2">{capsule?.notes}</h2>
              </div>
            )}
          </div>
        </div>
      </div>

      <Link
        href="/dashboard"
        className="text-lg text-primary-50 bg-accent-500 p-2 rounded-md hover:bg-accent-600 transition duration-200"
      >
        Go Back to Dashboard
      </Link>
    </div>
  );
}
