import mongoose from "mongoose";

const RecordingSchema = new mongoose.Schema({
  video: {
    type: String, // Base64 string
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId:{
    type:mongoose.Types.ObjectId,
    ref:'User'
  }
});

// Check if the model is already compiled to prevent errors
const Recording =  mongoose.models.Recording || mongoose.model("Recording", RecordingSchema);

export default Recording