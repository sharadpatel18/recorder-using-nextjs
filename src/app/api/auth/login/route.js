import { NextResponse } from "next/server";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dbConnect from "@/utils/db";

dbConnect();

export async function POST(req) {
    try {
        const { email, password } = await req.json();
        
        
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: "Invalid password" }, { status: 401 });
        }

        const token = jwt.sign({ userId: user._id , username: user.name , userEmail: user.email }, process.env.JWT_SECRET);
     
        return NextResponse.json({ message: "Login successful" , token:token}, { status: 200 });

    } catch (error) {
        console.error("Error during login:", error);
        return NextResponse.json({ error: "Login failed" }, { status: 500 });
    }
}
