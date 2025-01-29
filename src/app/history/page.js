"use client";

import { MyContext } from "@/context/MyContext";
import { useContext, useEffect, useState } from "react";
import Axios from "axios";

export default function HistoryPage() {
  const { user } = useContext(MyContext);
  const [videos, setVideos] = useState([]);
  const [userData, setUserData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal state
  const [selectedVideo, setSelectedVideo] = useState(null); // Track selected video
  const [message, setMessage] = useState({ type: "", text: "" }); // Track backend messages

  useEffect(() => {
    if (user?.userId) {
      Axios.post("/api/get-recording", { userId: user.userId })
        .then((res) => {
          if (res.data) {
            setVideos(res.data.recordings);
            setMessage({ type: "success", text: "Videos loaded successfully!" });
          } else {
            setMessage({ type: "error", text: res.data.message || "Failed to load videos." });
          }
        })
        .catch((error) => {
          console.error(error);
          setMessage({ type: "error", text: "An error occurred while fetching videos." });
        });
    }
  }, [user]);

  // Open the modal with the selected video
  const openModal = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  return (
    <div className="h-screen w-full bg-gray-100 flex justify-center items-center py-8">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 md:p-12 space-y-6">
        <h1 className="text-4xl font-semibold text-center text-gray-800">Your Videos</h1>
        <hr className="border-t-2 border-gray-200" />

        {/* Display backend messages */}
        {message.text && (
          <div
            className={`p-4 rounded-md text-center ${
              message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        {videos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div
                key={video._id}
                className="bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => openModal(video)} // Open modal on click
              >
                <video
                  src={video.video}
                  className="w-full h-48 object-cover rounded-md"
                  controls
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-gray-600">No videos available.</p>
        )}
      </div>

      {/* Modal to display video in fullscreen */}
      {isModalOpen && selectedVideo && (
        <div
          id="modal-overlay"
          onClick={closeModal} // Close modal when overlay is clicked
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
        >
          <div className="relative w-full h-full max-w-5xl max-h-screen">
            <button
              onClick={closeModal} // Close modal when close button is clicked
              className="absolute top-4 right-4 text-red-900 text-3xl font-bold"
            >
              ×
            </button>
            <video
              src={selectedVideo.video}
              className="w-full h-full object-contain"
              controls
              autoPlay
            />
          </div>
        </div>
      )}
    </div>
  );
}