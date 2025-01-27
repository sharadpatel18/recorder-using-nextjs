"use client";

import React, { useState, useRef } from "react";

const Recorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isScreenRecording, setIsScreenRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const videoElementRef = useRef(null);
  const videoBlobRef = useRef(null); // This will hold the recorded blob URL

  const startRecording = async () => {
    try {
      const videoStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });

      // Merge the video and screen streams (if needed)
      const combinedStream = new MediaStream([
        ...videoStream.getTracks(),
        ...screenStream.getTracks(),
      ]);

      mediaRecorderRef.current = new MediaRecorder(combinedStream, {
        mimeType: "video/webm",
      });

      const chunks = [];
      mediaRecorderRef.current.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        setRecordedBlob(blob);
        videoBlobRef.current = URL.createObjectURL(blob); // Store the recorded video URL
        setIsRecording(false);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      //videoElementRef.current.srcObject = combinedStream;
    } catch (error) {
      console.error("Error starting the recording:", error);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  const startScreenRecording = async () => {
    try {
        // Get both screen and microphone audio streams
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true, // Capture screen and audio
        });
        
        const audioStream = await navigator.mediaDevices.getUserMedia({
          audio: true, // Capture audio from microphone
        });
  
        // Combine the screen and audio streams
        const combinedStream = new MediaStream([
          ...screenStream.getTracks(),  // Screen tracks
          ...audioStream.getTracks(),   // Microphone tracks
        ]);
  
        mediaRecorderRef.current = new MediaRecorder(combinedStream, {
          mimeType: "video/webm", // Set mime type to webm for video
        });
  
        const chunks = [];
        mediaRecorderRef.current.ondataavailable = (event) => {
          chunks.push(event.data);
        };
  
        mediaRecorderRef.current.onstop = () => {
          const blob = new Blob(chunks, { type: "video/webm" });
          setRecordedBlob(blob);
          videoBlobRef.current = URL.createObjectURL(blob); // Create a URL for the recorded blob
          setIsScreenRecording(false);
        };
  
        mediaRecorderRef.current.start();
        setIsScreenRecording(true);
      //  videoElementRef.current.srcObject = combinedStream; // Show live stream while recording
      } catch (error) {
        console.error("Error starting the recording:", error);
      }
  };

  const stopScreenRecording = async () => {
    mediaRecorderRef.current.stop();
    setIsScreenRecording(false);
  };

  const handleDownload = () => {
    const url = URL.createObjectURL(recordedBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "recording.webm";
    link.click();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex space-x-4">
        <button
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
            isRecording ? "bg-red-500" : ""
          }`}
          onClick={isRecording ? stopRecording : startRecording}
        >
          {isRecording ? "Stop Audio + Screen" : "Start Audio + Screen"}
        </button>
        <button
          className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ${
            isScreenRecording ? "bg-red-500" : ""
          }`}
          onClick={
            isScreenRecording ? stopScreenRecording : startScreenRecording
          }
        >
          {isScreenRecording
            ? "Stop Screen Recording"
            : "Start Screen Recording"}
        </button>
      </div>
      <button
        className={`bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded ${
          !recordedBlob ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleDownload}
        disabled={!recordedBlob}
      >
        Download Recording
      </button>
      <video
        ref={videoElementRef}
        controls
        autoPlay
        className="w-full max-w-lg"
        // After recording stops, we update the src to the recorded video
        src={recordedBlob ? URL.createObjectURL(recordedBlob) : undefined}
      />
    </div>
  );
};

export default Recorder;
