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
const Login_1 = __importStar(require("../../schemas/Login"));
const router = express_1.default.Router();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const b = req.body;
        var { username, password } = b;
        username = username || "";
        password = password || "";
        var search = null;
        console.log("trying to authenticate user:" + username);
        if (username.includes("@") && username.includes(".")) {
            const [a, b] = username.split("@");
            var email = yield Login_1.Email.findOne({ username: a, domain: b });
            if (email != null) {
                search = yield Login_1.default.findOne({ email: email._id }).populate("email");
            }
        }
        else {
            console.log("Looking for username:" + username);
            search = yield Login_1.default.findOne({ name: username }).populate("email");
        }
        if (search == null || search.password !== password) {
            res.status(300).send(null);
            console.log("failed to authenticate:" + username);
            return;
        }
        console.log("User with cred authenticated:" + username);
        var toSend = {
            name: search.name,
            email: search.email.username + "@" + search.email.domain,
            image: search.image,
        };
        res.send(toSend);
    }
    catch (e) {
        res.status(500).send(null);
        return;
    }
}));
router.get("/*", (req, res) => {
    res.send("Wrong port u need to be at 3000");
});
router.post("/getMail", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var { email } = req.body;
        var [ename, domain] = email.split("@");
        var dbMail = yield Login_1.Email.findOne({ username: ename, domain: domain });
        if (dbMail == null || dbMail == undefined) {
            console.log("User with email:" + email + " failed to authenticated");
            res.json({ isExist: false });
            return;
        }
        console.log("User with email:" + email + " authenticated");
        res.json({ isExist: true });
        return;
    }
    catch (e) {
        console.error(e.message);
        res.json({ isExist: false });
        return;
    }
}));
router.post("/signUp", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const b = req.body;
        var { username, password, img, email } = b;
        var [ename, domain] = email.split("@");
        var dbMail = yield Login_1.Email.findOne({ username: ename, domain: domain });
        if (dbMail != null) {
            res.status(406).send("Email Exists");
            console.log("Email exists!!");
            return;
        }
        var dbUname = yield Login_1.default.findOne({ name: username });
        if (dbUname != null) {
            res.status(406).send("Username Exists");
            return;
        }
        let emailInsert;
        try {
            emailInsert = yield Login_1.Email.create({
                username: ename,
                domain: domain,
            });
        }
        catch (e) {
            console.error("Email cannot be created due to:" + e.message);
            res.status(500).send("Email creation failed");
            return;
        }
        let user;
        try {
            user = yield Login_1.default.create({
                name: username,
                password: password,
                image: img,
                email: emailInsert._id,
            });
            res.send("User:" + username + "+ created");
        }
        catch (e) {
            try {
                yield Login_1.Email.deleteOne({ username: ename, domain: domain });
            }
            catch (cleanupError) {
                console.error("Error cleaning up email:", cleanupError.message);
            }
            console.error("User cannot be created due to:" + e.message);
            return res.status(500).send("Internal server error (user creation)");
        }
    }
    catch (e) {
        console.error(e.message);
        res.status(500).send("Internal Error 123");
    }
}));
module.exports = router;
