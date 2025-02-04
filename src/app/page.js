"use client";

import { useContext } from "react";
import Recorder from "./Recorder";
import { MyContext } from "@/context/MyContext";
import { Video, LogIn } from "lucide-react";

function MyPage() {
  const { user } = useContext(MyContext);

  return (
    <div className="w-full h-screen flex flex-col bg-black text-white">
      {/* 🔹 HEADER - Like YouTube */}
      {/* <header className="w-full flex items-center justify-between px-6 py-3 bg-gray-900 shadow-md">
        <h1 className="text-2xl font-bold text-red-500">YouTube Recorder</h1>
        {user ? (
          <p className="text-gray-300">Welcome, {user.name}</p>
        ) : (
          <a
            href="/login"
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            <LogIn />
            <span>Login</span>
          </a>
        )}
      </header> */}

      {/* 🔹 MAIN CONTENT */}
      <div className="flex flex-grow">
        {/* 🔸 SIDEBAR - Like YouTube */}
        <aside className="hidden md:flex flex-col w-60 bg-gray-900 p-4 space-y-6 border-r border-gray-800">
          <button className="flex items-center space-x-2 text-lg font-semibold hover:text-red-500">
            <Video />
            <span>Record Video</span>
          </button>
        </aside>

        {/* 🔸 VIDEO RECORDING AREA */}
        <main className="flex flex-col items-center justify-center w-full h-screen p-6">
          {user ? (
            <div className="w-full h-4/5 max-w-3xl bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Start Recording</h2>
              <Recorder />
            </div>
          ) : (
            <div className="flex flex-col items-center text-center">
              <h2 className="text-2xl font-bold mb-4">Sign in to start recording</h2>
              <a
                href="/login"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
              >
                Login Now
              </a>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default MyPage;
