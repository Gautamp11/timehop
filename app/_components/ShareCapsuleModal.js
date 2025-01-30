"use client";

import { useState } from "react";
import ShareCapsuleList from "./ShareCapsuleList";

import { motion } from "framer-motion";
import useFramerMotion from "../_utils/useFramerMotion";

export default function ShareCapsuleModal({
  onClose,
  onShare,
  users,
  isLoading,
  setSearchQuery,
  searchQuery,
  userId,
}) {
  const [selectedUsers, setSelectedUsers] = useState([]);

  const { containerVariants } = useFramerMotion();

  const handleShare = () => {
    onShare(selectedUsers);
    onClose();
  };

  const handleCancel = () => {
    setSelectedUsers([]);
    onClose();
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter users based on the search term
  const filteredUsers = users.filter((user) => {
    // Ensure the user is not the current user
    if (user.id === userId) return false;

    // Normalize search query and user data for case-insensitive comparison
    const normalizedQuery = searchQuery.toLowerCase();
    const normalizedUsername = user.username.toLowerCase();
    const normalizedEmail = user.email.toLowerCase();

    // Check if the username or email includes the search query
    return (
      normalizedUsername.includes(normalizedQuery) ||
      normalizedEmail.includes(normalizedQuery)
    );
  });
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial="hidden"
        animate="visible"
        className="bg-primary-800 rounded-lg p-6 w-full max-w-md"
        variants={containerVariants}
      >
        <h2 className="text-xl font-semibold mb-4 text-primary-50">
          Share Capsule
        </h2>
        <input
          type="text"
          className="w-full bg-primary-500 p-2 mb-2 rounded-lg outline-none text-primary-50"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search User"
        />
        {isLoading ? (
          <div className="text-primary-50 text-center">
            <h2 className="text-2xl font-semibold mb-4 mt-2">Loading...</h2>
          </div>
        ) : (
          <ShareCapsuleList
            users={filteredUsers}
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
          />
        )}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={handleCancel}
            className="bg-gray-500 text-primary-50 p-2 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleShare}
            className="bg-accent-500 text-primary-50 p-2 rounded-md hover:bg-accent-600"
          >
            Share
          </button>
        </div>
      </motion.div>
    </div>
  );
}
