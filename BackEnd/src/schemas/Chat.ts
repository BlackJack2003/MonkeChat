import mongoose from "mongoose";

// Define schema for messages

interface MessageSchema {
  img: string;
  text: string;
  sender: mongoose.Types.ObjectId;
}

export interface MessageInt extends MessageSchema, mongoose.Document {}

const messageSchema = new mongoose.Schema<MessageInt>(
  {
    img: String,
    text: { type: String, required: true },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Assuming sender is a reference to User model
  },
  { timestamps: true }
);

// Define Message model
export const Message =
  mongoose.models.message || mongoose.model("message", messageSchema);

// Define schema for chat

interface ChatSchema {
  people: mongoose.Types.Array<{
    pid: mongoose.Types.ObjectId;
    encKey: string;
  }>;
  messages: mongoose.Types.Array<mongoose.Types.ObjectId>;
  name: string;
  image: string;
}

export interface ChatInt extends ChatSchema, mongoose.Document {}

const chatSchema = new mongoose.Schema<ChatInt>(
  {
    people: [
      {
        pid: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
          required: true,
        },
        encKey: { type: String, required: true },
      },
    ], // Assuming person1 and person2 are references to User model

    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "message" }], // Array of references to Message model
    name: String,
    image: String,
  },
  { timestamps: true }
);

// Define Chat model
const Chat = mongoose.models.chat || mongoose.model("chat", chatSchema);

export default Chat;
