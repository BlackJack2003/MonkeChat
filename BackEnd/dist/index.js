"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const Login_1 = __importStar(require("./schemas/Login"));
const login_js_1 = require("./utils/login.js");
const body_parser_1 = __importDefault(require("body-parser"));
const loginRouter = require("./routes/login/index");
const feedBackRouter = require("./routes/Feedback/index");
const settingsRouter = require("./routes/settings/index");
const app = (0, express_1.default)();
const dbAddr = "mongodb://127.0.0.1:27017/monkeChatDb";
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect(dbAddr);
        console.log("Connected");
    });
}
function setDefaultUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const email = yield Login_1.Email.create({
                username: "hemaangsood",
                domain: "gmail.com",
            });
            // Inserting a new user with the populated email field
            yield Login_1.default.create({
                name: "hemaang",
                password: (0, login_js_1.hashString)("test123"), // Assuming you have a function to hash passwords
                email: email._id, // Assign the ObjectId of the created email
            });
            console.log("Successfully inserted default user");
        }
        catch (e) {
            console.error("Failed to insert default user or email due to:\n" + e.message);
        }
    });
}
main()
    .then((x) => setDefaultUsers())
    .catch((e) => {
    console.log(e.message);
});
app.use(express_1.default.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(body_parser_1.default.json({ limit: "20mb" })); // for parsing application/json
app.get("", (req, res) => {
    res.send("Wrong port goto 3000");
});
app.use("/login", loginRouter);
app.use("/feedback", feedBackRouter);
app.use("/settings", settingsRouter);
app.listen(5000);
