"use client"

import { MyContext } from "@/context/MyContext";
import { motion } from "framer-motion";
import { Bell, Settings, Share2 } from "lucide-react"; // Lucide icons for YouTube-style actions
import {  useContext } from "react";

export default function ProfilePage() {
  const {user} = useContext(MyContext);
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
      </div>
    );
  }
    return (
      <div className="min-h-screen bg-black text-white">
        {/* Banner */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative h-48 bg-gradient-to-r from-red-700 to-red-900 flex items-center justify-center"
        >
          <h1 className="text-4xl font-bold">{user.username}</h1>
        </motion.div>
  
        {/* Profile Info */}
        <div className="px-6 sm:px-16 mt-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex items-center justify-between"
          >
            <div>
              <h2 className="text-2xl font-semibold">{user.username}</h2>
              <p className="text-gray-400 text-sm">{user.email}</p>
              <p className="text-gray-500 text-sm mt-1">2.5M Subscribers • Joined Jan 2021</p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-4">
              <motion.button 
                whileHover={{ scale: 1.1 }} 
                className="bg-gray-800 px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <Bell size={20} />
                <span>Subscribe</span>
              </motion.button>
  
              <motion.button 
                whileHover={{ scale: 1.1 }} 
                className="bg-gray-800 px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <Share2 size={20} />
                <span>Share</span>
              </motion.button>
  
              <motion.button 
                whileHover={{ scale: 1.1 }} 
                className="bg-gray-800 px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <Settings size={20} />
                <span>Settings</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
  
        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-6 px-6 sm:px-16 flex border-b border-gray-700"
        >
          {["Posts", "Community", "About"].map((tab, i) => (
            <motion.button 
              key={i} 
              whileHover={{ scale: 1.1, color: "rgb(255, 100, 100)" }} 
              className="py-3 px-6 text-gray-300 hover:text-red-500 border-b-2 border-transparent hover:border-red-500"
            >
              {tab}
            </motion.button>
          ))}
        </motion.div>
        
        {/* User Posts Section (Placeholder for Future Content) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="px-6 sm:px-16 py-10 text-gray-400 text-center"
        >
          <p>No posts yet. Start sharing your thoughts!</p>
        </motion.div>
      </div>
    );
}
