"use client";

import Link from "next/link";
import useFramerMotion from "../_utils/useFramerMotion";
import { motion } from "framer-motion";
import { useState } from "react";
import Modal from "./Modal";
import CreateCapsuleForm from "./CreateCapsuleForm";
import ShareCapsuleModal from "./ShareCapsuleModal";

const getCapsuleLockStatus = (unlockDate) => {
  if (!unlockDate) return { isLocked: false, daysToUnlock: null };

  const unlockTime = new Date(unlockDate).getTime();
  const currentTime = Date.now();
  const isLocked = unlockTime > currentTime;
  const daysToUnlock = isLocked
    ? Math.ceil((unlockTime - currentTime) / (1000 * 60 * 60 * 24))
    : null;

  return { isLocked, daysToUnlock };
};

export function CapusleDetails({ capsule, error, isOwner, sharedWith }) {
  const { isLocked, daysToUnlock } = getCapsuleLockStatus(capsule?.unlockDate);
  const { containerVariants, capsuleVariants } = useFramerMotion();
  const [openEditForm, setOpenEditForm] = useState(false);
  const [openShareForm, setOpenShareForm] = useState(false);

  const handleEdit = () => {
    setOpenEditForm(true);
  };
  const handleShare = () => {
    setOpenShareForm(true);
  };

  if (error) {
    return (
      <div className="text-primary-50 font-bold text-xl mt-8">
        Error fetching capsule
      </div>
    );
  }

  return (
    <motion.div
      className="text-primary-50 gap-8 w-full max-w-4xl mx-auto rounded-md p-6 bg-primary-700 shadow-lg mt-4 "
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h2
        variants={capsuleVariants}
        className="text-3xl font-semibold text-center text-primary-50"
      >
        {capsule.name}
      </motion.h2>

      {/* Grid Layout for Left and Right Sections */}
      <div className="flex flex-wrap gap-4 justify-around sm:flex-nowrap p-6">
        {/* Left Side: Capsule Details */}
        <motion.div
          className="flex flex-col items-center flex-1 "
          variants={containerVariants}
        >
          <img
            src="/capsule-1.png"
            alt={`${capsule.name} capsule`}
            className="w-36 h-36 rounded-lg shadow-xl transition-transform duration-300 hover:scale-105"
            aria-label="Capsule image"
          />

          <p className="text-center text-primary-300 text-md sm:text-lg mt-4">
            {capsule.description}
          </p>

          <div className="flex flex-col gap-4 items-center w-full mt-4">
            {isOwner ? (
              <div className="text-center flex flex-col gap-3 rounded-md p-4 shadow-xl transition-all hover:scale-105 transform duration-300 ">
                {capsule.filePath ? (
                  <Link
                    href={`${capsule?.filePath}`}
                    className="text-md bg-accent-500 font-semibold  mx-auto p-2 rounded-md hover:bg-accent-600 transition duration-200"
                  >
                    View capsule data
                  </Link>
                ) : (
                  <p className="italic">No File Attached</p>
                )}
                <h2 className=" mt-2">
                  Note:{" "}
                  {capsule.notes ? (
                    capsule.notes
                  ) : (
                    <span className="italic">Not added</span>
                  )}
                </h2>
                <div className="space-x-2 mx-auto">
                  <button
                    onClick={handleEdit}
                    className="text-md bg-accent-500 font-semibold max-w-fit mx-auto p-2 rounded-md hover:bg-accent-600 transition duration-200"
                  >
                    Edit
                  </button>{" "}
                  <button
                    onClick={handleShare}
                    className="text-md bg-accent-500 font-semibold max-w-fit mx-auto p-2 rounded-md hover:bg-accent-600 transition duration-200"
                  >
                    Share
                  </button>
                </div>
              </div>
            ) : isLocked ? (
              <>
                <button
                  className="bg-accent-500 text-primary-50 py-2 px-4 rounded-md font-semibold hover:bg-accent-600 transition duration-200"
                  aria-label="Unlocking status"
                >
                  Unlocking in:{" "}
                  <span>
                    {daysToUnlock ? `${daysToUnlock} days` : "No date"}
                  </span>
                </button>
                <Link
                  href="#"
                  className="bg-primary-500 text-primary-50 hover:bg-primary-600 transition-all py-2 px-4 rounded-md font-semibold duration-200"
                >
                  Request early unlock
                </Link>
              </>
            ) : (
              <div className="text-center flex flex-col gap-2 bg-primary-600 rounded-md p-4 shadow-lg">
                <p className="text-primary-50 font-bold text-xl mt-2 mb-2">
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
            <Link
              href="/dashboard"
              className="text-lg text-primary-50 bg-accent-500 p-2 rounded-md hover:bg-accent-600 transition duration-200"
              aria-label="Go back to dashboard"
            >
              Go Back to Dashboard
            </Link>
          </div>
        </motion.div>
        {/* Right Side: Shared With Users */}
        {isOwner && (
          <div className="bg-primary-800 rounded-md p-6 shadow-lg w-1/2 ">
            <h3 className="text-lg font-semibold mb-3">Shared With</h3>

            {sharedWith.length > 0 ? (
              <ul className="text-primary-200 space-y-2 bg-primary-600 p-2 rounded-md">
                {sharedWith.map((shared) => (
                  <li key={shared.users.id} className="text-md ">
                    {shared.users.username}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm italic text-gray-400">
                Not shared with anyone.
              </p>
            )}
          </div>
        )}
      </div>
      {/* Edit Form Modal */}
      {openEditForm && (
        <Modal onClose={() => setOpenEditForm(false)}>
          <CreateCapsuleForm
            onClose={() => setShowCreateModal(false)}
            editCapsule={capsule}
          />
        </Modal>
      )}

      {/* Share capsule modal */}
      {openShareForm && <ShareCapsuleModal></ShareCapsuleModal>}
    </motion.div>
  );
}
