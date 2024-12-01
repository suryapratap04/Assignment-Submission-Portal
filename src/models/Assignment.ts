import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  userId: {
    type: String,
    required: true,
  },
  task: {
    type: String,
    required: true,
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  accepted: {
    type: String,
    enum: ["accepted", "rejected", "waiting"],
    default: "waiting",
  },
});

export default mongoose.model("Assignment", assignmentSchema);
