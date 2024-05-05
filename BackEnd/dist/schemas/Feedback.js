"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const FeedbackSchema = new mongoose_1.default.Schema({
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
const Feedback = mongoose_1.default.models.Feedback || mongoose_1.default.model("Feedback", FeedbackSchema);
exports.default = Feedback;
