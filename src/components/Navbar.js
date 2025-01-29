"use client";

import { MyContext } from "@/context/MyContext";
import Link from "next/link";
import { useContext } from "react";

export default function Navbar() {
    const {user} = useContext(MyContext);

    return (
        <div>
            <nav className="bg-white shadow-md">
                <div className="container mx-auto px-4 py-2">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <Link href="/" className="text-xl font-bold text-green-500 mx-2">Hello, </Link>
                            <Link href="/" className="text-xl font-bold text-blue-500">{user?.username}</Link>
                        </div>
                        <div className="hidden md:flex items-center">
                            <Link href="/" className="px-4 py-2 hover:bg-gray-200 rounded-md">Home</Link>
                            {
                                user ? (
                                    <Link href="/auth/login" className="px-4 py-2 hover:bg-gray-200 rounded-md">Logout</Link>
                                ) : (
                                    <Link href="/auth/login" className="px-4 py-2 hover:bg-gray-200 rounded-md">Login</Link>
                                )
                            }
                            <Link href="/history" className="px-4 py-2 hover:bg-gray-200 rounded-md">Your Videos</Link>
                        </div>
                    </div>
                </div>
            </nav>
            
        </div>
    );
}   