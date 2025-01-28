// app/api/auth/signup.js

import dbConnect from "@/utils/db";
import { NextResponse } from "next/server";
import User from "@/models/User";
import bcrypt from "bcrypt";

dbConnect();
export async function POST(req) {
    try {
        const { name, email, password } = await req.json();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 409 });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = new User({ name, email, password:hashPassword });
        await user.save();

        return NextResponse.json({ message: "Signup successful" }, { status: 201 });
    } catch (error) {
        console.error("Error during signup:", error);
        return NextResponse.json({ error: "Signup failed" }, { status: 500 });
    }
}
