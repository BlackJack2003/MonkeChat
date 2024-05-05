import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
  name: {
    first: { type: String, required: true },
    last: { type: String, required: true },
  },
  email: {
    username: { type: String, required: true },
    domain: { type: String, required: true },
  },
  message: { type: String, required: true },
});

const Feedback =
  mongoose.models.Feedback || mongoose.model("Feedback", FeedbackSchema);

export default Feedback;
