import Recording from "@/models/Recording";
import dbConnect from "@/utils/db";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

dbConnect();

export async function POST(req) {
  try {
    const {userId} = await req.json();
    
    if (!userId) {
      return NextResponse.json({ message: "userId is required" }, { status: 400 });
    }

    const mongooseUserId = new mongoose.Types.ObjectId(userId);
    const recordings = await Recording.find({ userId: mongooseUserId });
    
    if (!recordings.length) {
      return NextResponse.json({ message: "No recordings found for this user" }, { status: 404 });
    }
    
    return NextResponse.json({ recordings });
  } catch (error) {
    console.error("Error fetching recordings:", error);
    return NextResponse.json({ message: "Failed to fetch recordings" }, { status: 500 });
  }
}
