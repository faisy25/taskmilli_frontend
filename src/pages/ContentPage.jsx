// src/components/ContentPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../components/Modal";

const ContentPage = () => {
  const [people, setPeople] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState(null); // To track the selected person
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility

  useEffect(() => {
    const fetchPeople = async () => {
      setLoading(true);
      setError(null); // Reset error before fetching
      try {
        const response = await axios.get(
          `https://swapi.dev/api/people/?page=${page}`
        );
        setPeople(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 10)); // API returns 10 people per page
      } catch (err) {
        setError("Failed to fetch data from SWAPI. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPeople();
  }, [page]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const openModal = (person) => {
    setSelectedPerson(person); // Set the selected person
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedPerson(null); // Reset the selected person
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-dim">
        <h1 className="text-dark text-3xl font-bolder mb-6">
          Star Wars Characters
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <div className="text-red-500">
            <p>{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl px-4">
            {people.map((person, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
                {/* Random image from Picsum */}
                <img
                  className="w-full h-40 object-cover rounded-md mb-4"
                  src={`https://picsum.photos/seed/${person.name}/300/200`}
                  alt={person.name}
                />
                <h3 className="text-dark font-bold mb-2">{person.name}</h3>
                <p className="text-medium mb-2">Height: {person.height} cm</p>
                <p className="text-medium mb-2">Mass: {person.mass} kg</p>
                <p className="text-medium mb-2">Gender: {person.gender}</p>

                {/* Details Button */}
                <button
                  className="mt-4 px-4 py-2 bg-dark text-white rounded-lg font-medium hover:bg-medium transition-colors"
                  onClick={() => openModal(person)} // Open modal with person details
                >
                  Details
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex mt-8 space-x-4">
          <button
            onClick={handlePreviousPage}
            disabled={page === 1}
            className={`px-4 py-2 bg-dark text-white rounded-lg font-medium hover:bg-medium transition-colors ${
              page === 1 && "opacity-50 cursor-not-allowed"
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className={`px-4 py-2 bg-dark text-white rounded-lg font-medium hover:bg-medium transition-colors ${
              page === totalPages && "opacity-50 cursor-not-allowed"
            }`}
          >
            Next
          </button>
        </div>

        <p className="mt-4 text-medium">
          Page {page} of {totalPages}
        </p>

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          person={selectedPerson}
        />
      </div>
    </>
  );
};

export default ContentPage;
