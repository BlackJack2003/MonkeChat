"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect("mongodb://localhost/monkeChatDb");
const app = (0, express_1.default)();
app.use(express_1.default.json()); // for parsing application/json
app.use(express_1.default.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
const user = { id: "42", name: "hemaa", password: "test123" };
app.post("/", (req, res) => {
    console.log(req.body);
    res.send(user);
});
app.get("/", (req, res) => {
    res.send("Hello wrong port u need to be at 3000");
});
app.listen(5000);
