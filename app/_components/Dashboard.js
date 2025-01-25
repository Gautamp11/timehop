"use client";

import { useEffect, useMemo, useState } from "react";
import Capsules from "./Capsules";
import CreateCapsuleForm from "./CreateCapsuleForm";
import Modal from "./Modal";
import {
  getCapsules,
  getSharedCapsules,
  getUsers,
  shareCapsule,
} from "@/actions";
import { useAuth } from "@clerk/nextjs";
import ShareCapsuleModal from "./ShareCapsuleModal";

export default function Dashboard() {
  const [activeCategory, setActiveCategory] = useState("myCapsules");
  const { isLoaded, userId } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [capsules, setCapsules] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCapsuleId, setSelectedCapsuleId] = useState(null);
  const [sharedCapsules, setSharedCapsules] = useState([]);

  // Fetch capsules on mount
  useEffect(() => {
    const fetchCapsules = async () => {
      if (userId) {
        try {
          const capsulesData = await getCapsules(userId);
          const sharedCapsulesData = await getSharedCapsules(userId);
          setCapsules(capsulesData);
          setSharedCapsules(sharedCapsulesData);
        } catch (error) {
          console.error("Error fetching capsules:", error.message);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchCapsules();
  }, [userId]);

  const filteredCapsules = useMemo(() => {
    if (activeCategory === "myCapsules") {
      return capsules;
    } else if (activeCategory === "sharedByMe") {
      const sharedCapsuleIds = sharedCapsules
        .filter((shared) => shared.sharedBy === userId)
        .map((capsule) => capsule.capsuleId);
      return capsules.filter((capsule) =>
        sharedCapsuleIds.includes(capsule.id)
      );
    } else if (activeCategory === "sharedWithMe") {
      // Show capsules shared with the current user
      const sharedCapsuleIds = sharedCapsules
        .filter((shared) => shared.shared_with === userId)
        .map((shared) => shared.capsule_id);
      return capsules.filter((capsule) =>
        sharedCapsuleIds.includes(capsule.id)
      );
    }
    return [];
  }, [capsules, sharedCapsules, activeCategory, userId]);

  // Fetch users when the share modal is opened
  useEffect(() => {
    if (showShareModal) {
      const fetchUsers = async () => {
        setIsLoading(true);
        try {
          const { users, error } = await getUsers();
          if (error) throw error;
          setUsers(users);
        } catch (error) {
          console.error("Error fetching users:", error.message);
        } finally {
          setIsLoading(false);
        }
      };

      fetchUsers();
    }
  }, [showShareModal]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handleShareCapsule = (capsuleId) => {
    setSelectedCapsuleId(capsuleId);
    setShowShareModal(true);
  };

  const handleShare = async (selectedUsers) => {
    if (!selectedCapsuleId || !userId || !selectedUsers.length) {
      console.error(
        "Invalid input: capsuleId, userId, or selectedUsers missing."
      );
      return;
    }

    const { data, error } = await shareCapsule(
      selectedCapsuleId,
      userId,
      selectedUsers
    );

    if (error) {
      console.error("Failed to share capsule:", error);
      // Show error message to the user
    } else {
      console.log("Capsule shared successfully:", data);
      // Show success message to the user
    }

    setShowShareModal(false); // Close the modal after sharing
  };

  return (
    <div className="grid w-full max-w-4xl p-4">
      {isLoading ? (
        <div className="text-primary-50 text-center">
          <h2 className="text-2xl font-semibold mb-4 mt-2">Loading...</h2>
        </div>
      ) : (
        <Capsules
          activeCategory={activeCategory}
          handleCategoryChange={handleCategoryChange}
          capsules={filteredCapsules}
          onShareCapsule={handleShareCapsule}
        />
      )}

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
          <CreateCapsuleForm onClose={() => setShowCreateModal(false)} />
        </Modal>
      )}

      {showShareModal && (
        <ShareCapsuleModal
          onClose={() => setShowShareModal(false)}
          onShare={handleShare}
          users={users}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
