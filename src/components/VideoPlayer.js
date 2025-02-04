import { set } from "mongoose";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, Loader2 } from "lucide-react";

const VideoPlayer = ({ videoUrl }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [hasInfiniteDuration, setHasInfiniteDuration] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const handleLoadedMetadata = useCallback(() => {
    const video = videoRef.current;

    if (video) {
      const videoDuration = video.duration;
      setDuration(videoDuration);
      if (!isFinite(videoDuration)) {
        setHasInfiniteDuration(true);
      } else {
        setHasInfiniteDuration(false);
      }
      if (!hasInfiniteDuration || video.readyState >= 2) {
        setIsLoading(false);
        setIsVideoLoading;
      }
    }
  }, [hasInfiniteDuration]);

  useEffect(() => {
    const video = videoRef.current;
    if (videoLoaded && video) {
      video.currentTime = 0;
      video.play().catch((error) => console.error("Error playing video:", error));
      setIsPlaying(true);
    }
  }, [videoLoaded]);

  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      if (!isFinite(video.duration)) {
        setHasInfiniteDuration(true);
        formatTime(currentTime);
      } else {
        setHasInfiniteDuration(false);
        setVideoLoaded(true);
      }
    }

    if (video && isFinite(video.duration)) {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / video.duration) * 100);
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      handleLoadedMetadata();
      handleTimeUpdate();
      const handleCanPlay = () => {
        if (hasInfiniteDuration) {
          setIsVideoLoading(false);
        }
      };
      video.addEventListener("canplay", handleCanPlay);

      return () => {
        video.removeEventListener("canplay", handleCanPlay);
      };
    }
  }, [handleLoadedMetadata, handleTimeUpdate, hasInfiniteDuration]);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused || video.ended) {
      video.play().catch((error) => console.error("Error playing video:", error));
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (e) => {
    const video = videoRef.current;
    if (!video || !isFinite(duration)) return;
    const seekTime = (e.nativeEvent.offsetX / e.target.offsetWidth) * duration;
    video.currentTime = seekTime;
  };

  const formatTime = (time) => {
    if (!isFinite(time)) {
      time = 0;
    }
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-gray-900 text-white rounded-lg shadow-lg relative">
      {hasInfiniteDuration && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-150">
          <Loader2 className="animate-spin text-blue-500 mx-2" size={40} />
          <h1 className="text-2xl font-bold text-white mt-4">Please wait... video is loading</h1>
        </div>
      )}
      <video
        ref={videoRef}
        src={videoUrl}
        className={`w-full rounded-lg ${isLoading ? "opacity-0" : "opacity-100"}`}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onCanPlay={() => setIsLoading(false)}
        preload="metadata"
        autoPlay={hasInfiniteDuration}
        muted={hasInfiniteDuration}
      />
      <div className="flex items-center gap-4 mt-4">
        <button
          onClick={() => {
            const video = videoRef.current;
            if (video) video.currentTime = Math.max(video.currentTime - 2, 0);
          }}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white"
        >
          -2 sec
        </button>
        <button
          onClick={togglePlayPause}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button
          onClick={() => {
            const video = videoRef.current;
            if (video) video.currentTime = Math.min(video.currentTime + 2, video.duration);
          }}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white"
        >
          +2 sec
        </button>
        <span className="text-sm">{formatTime(currentTime)} / {formatTime(duration)}</span>
          {
            !hasInfiniteDuration && (  <div
              className={`flex-1 h-2 bg-gray-500 rounded-lg cursor-pointer relative ${hasInfiniteDuration ? "opacity-50 cursor-default" : ""}`}
              onClick={hasInfiniteDuration ? null : handleSeek}
            >
              <div className="h-2 bg-blue-500 rounded-lg" style={{ width: `${progress}%` }} /> 
            </div>)
          }
      </div>
    </div>
  );
};

export default VideoPlayer;