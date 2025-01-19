"use client";
import Image from "next/image";
import { useState } from "react";
import Capsules from "./Capsules";
import { useCapsules } from "../_contexts/CapsulesContext";
import CreateCapsuleForm from "./CreateCapsuleForm";
import Modal from "./Modal";

export default function Dashboard() {
  const [activeCategory, setActiveCategory] = useState("myCapsules"); // Default category
  const [showModal, setShowModal] = useState(false);

  const { capsules } = useCapsules();

  const onClose = () => {
    setShowModal(false);
  };

  // Function to handle category switch
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    // You may fetch or filter capsules based on the selected category here
  };

  return (
    <div className="grid">
      <Capsules
        activeCategory={activeCategory}
        handleCategoryChange={handleCategoryChange}
        capsules={capsules}
      />

      <button
        onClick={() => setShowModal(true)}
        className="bg-accent-500 text-primary-50 p-2 rounded-md mx-auto mb-2 hover:bg-accent-600"
      >
        Create Capsule
      </button>

      {showModal && (
        <Modal onClose={onClose}>
          <CreateCapsuleForm onClose={onClose} />
        </Modal>
      )}
    </div>
  );
}
