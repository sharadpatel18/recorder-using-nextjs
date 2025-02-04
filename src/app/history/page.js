"use client";

import { MyContext } from "@/context/MyContext";
import { useContext, useEffect, useState, useRef } from "react";
import Axios from "axios";
import VideoPlayer from "@/components/VideoPlayer";
import { PlayCircle, X } from "lucide-react";

export default function HistoryPage() {
  const { user } = useContext(MyContext);
  const selectedVideoRef = useRef(null);
  const [videos, setVideos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });

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

  const openModal = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-6xl">
        <h1 className="text-4xl font-bold mb-8 text-center">Your Videos</h1>
        {message.text && (
          <div className={`p-4 rounded-md text-center ${message.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
            {message.text}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.length > 0 ? (
            videos.map((video) => (
              <div key={video._id} className="relative group cursor-pointer my-5" onClick={() => openModal(video)}>
                <video src={video.video} className="w-full h-48 object-cover rounded-lg shadow-lg" />
                <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                  <PlayCircle className="text-white" size={60} />
                </div>
                <p className="mt-3 text-lg font-semibold text-center">{video.title || "Untitled Video"}</p>
              </div>
            ))
          ) : (
            <div className="col-span-full flex justify-center items-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-white"></div>
            </div>
          )}
        </div>
      </div>
      {isModalOpen && selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50 px-4">
          <div className="relative w-full max-w-4xl">
            <button onClick={closeModal} className="absolute top-4 right-4 text-white text-4xl font-bold">
              <X />
            </button>
            <VideoPlayer videoUrl={selectedVideo.video} />
          </div>
        </div>
      )}
    </div>
  );
}