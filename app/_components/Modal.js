import React, { useEffect, useRef } from "react";

function Modal({ children, onClose }) {
  const handleOverlayClick = (event) => {
    // Close modal if the overlay itself is clicked
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-md flex items-center justify-center"
    >
      <div className="relative bg-primary-700 p-6 shadow-lg max-w-md w-full rounded-lg">
        {children}
        <button
          onClick={onClose}
          className="absolute top-10 right-10 bg-accent-500 px-2 rounded-full font-semibold  text-inherit  hover:bg-accent-600 !text-white "
        >
          x
        </button>
      </div>
    </div>
  );
}

export default Modal;
