import mongoose from "mongoose";
import User from "../../schemas/User";
import Chat from "../../schemas/Chat";
import express from "express";
import { getChats } from "../../utils/chats";
const router = express.Router();

router.post("/getChats", async (req, res) => {
  try {
    const b = req.body;
    const { name, private_key } = b;
    const user = await User.findOne({ name: name });
    if (user == null || user == undefined) {
      res.status(500).send("Nope");
      console.log("User:" + name + " not found");
      return;
    }
    if (private_key != user.private_key) {
      res.status(500).send("Nope password no match");
      console.log("password no match");
      return;
    }
    const toSend = await getChats(user._id);
    console.log("Send chat list of user:", name);
    res.json(toSend);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send("Fail");
  }
});

module.exports = router;
