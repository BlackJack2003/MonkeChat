"use strict";
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
const User_1 = __importDefault(require("./schemas/User"));
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
            yield User_1.default.insertMany({
                name: "hemaa",
                password: (0, login_js_1.hashString)("test123"),
                email: { username: "hemaangsood",
                    domain: "gmail.com"
                },
            });
            console.log("Successfully inserted def user");
        }
        catch (e) {
            console.error("Failed to insert def user due to:\n" + e.message);
        }
    });
}
main().then(x => setDefaultUsers()).catch((e) => {
    console.log(e.message);
});
const app = (0, express_1.default)();
app.use(express_1.default.json()); // for parsing application/json
app.use(express_1.default.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const b = req.body;
    var { username, password } = b;
    console.log("trying to authenticate user:" + username);
    var search = yield User_1.default.findOne({ name: username });
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
app.listen(5000);
