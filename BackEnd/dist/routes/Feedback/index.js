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
const Feedback_1 = __importDefault(require("../../schemas/Feedback"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.send("Wrong port");
});
router.post("", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const b = req.body;
    console.log(b);
    try {
        const [u, d] = b.email.split("@");
        yield Feedback_1.default.insertMany({
            name: {
                first: b.fname,
                last: b.lname,
            },
            email: {
                username: u,
                domain: d || "gmail.com",
            },
            message: b.message,
        });
        res.json({ message: "Feedback received!!" });
    }
    catch (e) {
        console.error("Failed feedback call due to:" + e.message);
        res.json({ message: "Feedback fail!!" });
    }
}));
module.exports = router;
