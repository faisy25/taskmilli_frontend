// src/components/Modal.jsx
import React from "react";

const Modal = ({ isOpen, onClose, person }) => {
  if (!isOpen) return null; // Do not render the modal if it's not open

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-dark font-bold text-2xl"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Modal Content */}
        <div className="flex flex-col items-center">
          {/* Random Image */}
          <img
            className="w-full h-56 object-cover rounded-md mb-4"
            src={`https://picsum.photos/seed/${person.name}-modal/600/400`}
            alt={person.name}
          />

          {/* Person Details */}
          <h2 className="text-2xl font-bolder mb-4">{person.name}</h2>
          <p className="text-medium mb-2">
            <strong>Height:</strong> {person.height} cm
          </p>
          <p className="text-medium mb-2">
            <strong>Mass:</strong> {person.mass} kg
          </p>
          <p className="text-medium mb-2">
            <strong>Gender:</strong> {person.gender}
          </p>
          <p className="text-medium mb-2">
            <strong>Birth Year:</strong> {person.birth_year}
          </p>
          <p className="text-medium mb-2">
            <strong>Eye Color:</strong> {person.eye_color}
          </p>
          <p className="text-medium mb-2">
            <strong>Hair Color:</strong> {person.hair_color}
          </p>
          <p className="text-medium mb-2">
            <strong>Skin Color:</strong> {person.skin_color}
          </p>

          {/* More Details */}
          <p className="text-medium mb-4">
            This Star Wars character is known for their unique traits and
            appearances in the galaxy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
