"use client";

import { MyContext } from "@/context/MyContext";
import Link from "next/link";
import { useContext } from "react";

export default function Navbar() {
    const {user} = useContext(MyContext);
    console.log(user);
    
    return (
        <div>
            <nav className="bg-white shadow-md">
                <div className="container mx-auto px-4 py-2">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <a href="#" className="text-xl font-bold text-green-500 mx-2">Hello, </a>
                            <a href="#" className="text-xl font-bold text-blue-500">{user?.username}</a>
                        </div>
                        <div className="hidden md:flex items-center">
                            <Link href="/" className="px-4 py-2 hover:bg-gray-200 rounded-md">Home</Link>
                            <Link href="/auth/signup" className="px-4 py-2 hover:bg-gray-200 rounded-md">Signup</Link>
                            <Link href="/auth/login" className="px-4 py-2 hover:bg-gray-200 rounded-md">Login</Link>
                            <a href="#" className="px-4 py-2 hover:bg-gray-200 rounded-md">Contact</a>
                        </div>
                    </div>
                </div>
            </nav>
            
        </div>
    );
}   