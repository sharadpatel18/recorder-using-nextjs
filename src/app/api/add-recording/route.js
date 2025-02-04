import { NextResponse } from "next/server";
import Recording from "@/models/Recording";
import dbConnect from "@/utils/db";

dbConnect();
export async function POST(req) {
  try {
    const { video, userId } = await req.json();

    if (!video) {
      return NextResponse.json(
        { error: "No video data provided" },
        { status: 400 }
      );
    }

    const newRecording = new Recording({ video, userId });
    await newRecording.save();
    return NextResponse.json(
      { message: "File uploaded successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}