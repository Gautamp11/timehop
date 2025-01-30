"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Capsules from "./Capsules";
import CreateCapsuleForm from "./CreateCapsuleForm";
import Modal from "./Modal";
import { getUsers, shareCapsule } from "@/actions";
import ShareCapsuleModal from "./ShareCapsuleModal";
import { toast } from "react-toastify";
import Loading from "../dashboard/loading";
import useFilteredCapsules from "../_hooks/useFilteredCapsules";
import useShareCapsule from "../_hooks/useShareCapsule";

export default function Dashboard({ capsules, sharedCapsules, userId }) {
  const [activeCategory, setActiveCategory] = useState("myCapsules");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [editCapsule, setEditCapsule] = useState(null);

  // Filter capsules based on the active category
  const filteredCapsules = useFilteredCapsules({
    activeCategory,
    capsules,
    sharedCapsules,
    userId,
  });

  //Share Capsule hook
  const {
    users,
    isLoading,
    searchQuery,
    setSearchQuery,
    handleShare,
    setSelectedCapsuleId,
  } = useShareCapsule(userId);

  const handleEditCapsule = (capsule) => {
    setEditCapsule(capsule);
    setShowCreateModal(true);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handleShareCapsule = (capsuleId) => {
    setSelectedCapsuleId(capsuleId);
    setShowShareModal(true);
  };

  return (
    <div className="grid w-full max-w-4xl p-4">
      <Capsules
        activeCategory={activeCategory}
        handleCategoryChange={handleCategoryChange}
        capsules={filteredCapsules}
        onShareCapsule={handleShareCapsule}
        onEditCapsule={handleEditCapsule}
        setShowShareModal={setShowShareModal}
      />

      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-accent-500 text-primary-50 p-2 rounded-md hover:bg-accent-600"
        >
          Create Capsule
        </button>
      </div>
      {showCreateModal && (
        <Modal onClose={() => setShowCreateModal(false)}>
          <CreateCapsuleForm
            onClose={() => setShowCreateModal(false)}
            editCapsule={editCapsule}
          />
        </Modal>
      )}
      {showShareModal && (
        <ShareCapsuleModal
          onClose={() => setShowShareModal(false)}
          onShare={handleShare}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          users={users}
          isLoading={isLoading}
          userId={userId}
        />
      )}
    </div>
  );
}
