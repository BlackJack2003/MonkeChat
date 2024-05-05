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
                name: "hemaa",
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
const app = (0, express_1.default)();
app.use(express_1.default.json()); // for parsing application/json
app.use(express_1.default.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const b = req.body;
    var { username, password } = b;
    console.log("trying to authenticate user:" + username);
    var search = yield Login_1.default.findOne({ name: username });
    if (search == null || search.password !== password) {
        res.status(300).send(null);
        return;
    }
    console.log("User authenticated:" + username);
    res.send(search);
}));
app.get("/", (req, res) => {
    res.send("Hello wrong port u need to be at 3000");
});
app.post("/getMail", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var { email } = req.body;
    var [ename, domain] = email.split("@");
    console.log("email:" + email);
    var dbMail = yield Login_1.Email.findOne({ username: ename, domain: domain });
    console.log(dbMail);
    if (dbMail == null || dbMail == undefined) {
        res.json({ isExist: false });
        return;
    }
    res.json({ isExist: true });
    return;
}));
app.listen(5000);
