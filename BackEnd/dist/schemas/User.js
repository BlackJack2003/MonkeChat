"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const emailSchema = new mongoose_1.default.Schema({ username: { type: String, required: true }, domain: { type: String, required: true } });
mongoose_1.default.model('email', emailSchema);
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, unique: true },
    email: { type: emailSchema, unique: true },
    password: { type: String, required: true },
    image: { type: String, default: " data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/4QBWRXhpZgAATU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAAITAAMAAAABAAEAAAAAAAAAAAEsAAAAAQAAASwAAAAB/+0ALFBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAAAPHAFaAAMbJUccAQAAAgAEAP/hDIFodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0n77u/JyBpZD0nVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkJz8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0nYWRvYmU6bnM6bWV0YS8nIHg6eG1wdGs9J0ltYWdlOjpFeGlmVG9vbCAxMS44OCc+CjxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczp0aWZmPSdodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyc+CiAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICA8dGlmZjpYUmVzb2x1dGlvbj4zMDAvMTwvdGlmZjpYUmVzb2x1dGlvbj4KICA8dGlmZjpZUmVzb2x1dGlvbj4zMDAvMTwvdGlmZjpZUmVzb2x1dGlvbj4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6eG1wTU09J2h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8nPgogIDx4bXBNTTpEb2N1bWVudElEPmFkb2JlOmRvY2lkOnN0b2NrOmJhMzY2N2M1LTgwZDAtNDI0NS1hMDJjLWJkNjEzYWQ4MTUwNzwveG1wTU06RG9jdW1lbnRJRD4KICA8eG1wTU06SW5zdGFuY2VJRD54bXAuaWlkOjJhNDdkZjVhLThhMzUtNDY5My05NDM2LTZmNTcxZjJjOTRkNjwveG1wTU06SW5zdGFuY2VJRD4KIDwvcmRmOkRlc2NyaXB0aW9uPgo8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSd3Jz8+/9sAQwAFAwQEBAMFBAQEBQUFBgcMCAcHBwcPCwsJDBEPEhIRDxERExYcFxMUGhURERghGBodHR8fHxMXIiQiHiQcHh8e/8AACwgBaAFoAQERAP/EABsAAQADAQEBAQAAAAAAAAAAAAAEBQYDAgEI/8QAOxABAAIBAgMEBQsCBwEBAAAAAAECAwQFESExBhJBURMicYHRFCNCUmFykaGxweEyYxUzQ2KCkvA0VP/aAAgBAQAAPwD9gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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" },
});
exports.default = mongoose_1.default.models.user || mongoose_1.default.model('user', userSchema);