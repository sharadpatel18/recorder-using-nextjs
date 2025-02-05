"use client";

import { MyContext } from "@/context/MyContext";
import Link from "next/link";
import { useContext, useState } from "react";
import { Search } from "lucide-react"; // Import Search from lucide-react
import { User } from "lucide-react";  // Import User icon from lucide-react

export default function Navbar() {
    const { user } = useContext(MyContext);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (e) => setSearchTerm(e.target.value);

    return (
        <div>
            <nav className="bg-gray-900 shadow-md">
                <div className="container mx-auto px-4 py-2">
                    <div className="flex justify-between items-center">
                        {/* Left Section: Logo and Links */}
                        <div className="flex items-center space-x-6">
                            <Link href="/" className="text-3xl font-bold text-red-600">
                                YouTube
                            </Link>
                            <div className="hidden md:flex space-x-6">
                                <Link href="/" className="text-lg text-gray-300 hover:text-white">Home</Link>
                                {user && (
                                    <Link href="/history" className="text-lg text-gray-300 hover:text-white">Your Videos</Link>
                                )}
                            </div>
                        </div>

                        {/* Middle Section: Search Bar */}
                        <div className="flex items-center w-full max-w-3xl mx-6 relative">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="w-full py-2 pl-4 pr-10 text-lg rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="Search"
                            />
                            <button className="absolute right-0 p-2 text-gray-400 hover:text-red-600">
                                <Search /> {/* Replaced FaSearch with Lucide's Search */}
                            </button>
                        </div>

                        {/* Right Section: User Info and Login/Logout */}
                        <div className="flex items-center space-x-6">
                            {user ? (
                                <Link href="/profile" className="flex items-center text-gray-300 hover:text-white">
                                    <User className="mr-2" /> {/* Replaced FaUserCircle with User from lucide-react */}
                                    <span className="text-lg">{user.username}</span>
                                </Link>
                            ) : (
                                <Link href="/auth/login" className="text-lg text-gray-300 hover:text-white">
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}
