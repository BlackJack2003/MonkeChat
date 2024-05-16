import mongoose from "mongoose";

// Define schema for messages
const messageSchema = new mongoose.Schema(
  {
    img: String,
    text: { type: String, required: true },
    sender: { type: mongoose.Types.ObjectId, ref: "User", required: true }, // Assuming sender is a reference to User model
  },
  { timestamps: true }
);

// Define Message model
export const Message =
  mongoose.models.message || mongoose.model("message", messageSchema);

// Define schema for chat
const chatSchema = new mongoose.Schema(
  {
    people: [{ type: mongoose.Types.ObjectId, ref: "user", required: true }], // Assuming person1 and person2 are references to User model
    messages: [{ type: mongoose.Types.ObjectId, ref: "message" }], // Array of references to Message model
    name: String,
    image: String,
  },
  { timestamps: true }
);

// Define Chat model
const Chat = mongoose.models.chat || mongoose.model("chat", chatSchema);

export default Chat;
