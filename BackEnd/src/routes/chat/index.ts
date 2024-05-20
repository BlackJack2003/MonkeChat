import User from "../../schemas/User";
import express from "express";
import {
  ChatMenuItemInterface,
  getChats,
  getMessagesAll,
  sendMessage,
} from "../../utils/chats";
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
    const toSend: ChatMenuItemInterface[] = await getChats(user._id.toString());
    res.json(toSend);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send("Fail");
  }
});

router.post("/getMessagesAll", async (req, res) => {
  try {
    const b = req.body;
    const { name, private_key, chatId } = b;
    const user = await User.findOne({ name: name });
    if (user == null || user == undefined) {
      res.status(500).send("Nope");
      console.log("User:" + name + " not found");
      return;
    }
    if (private_key != user.private_key) {
      res.status(500).send("Nope password no match");

      return;
    }
    const toSend = await getMessagesAll(user._id, chatId);
    console.log("sending messages for user:" + name);
    res.json(toSend);
  } catch (e: any) {
    console.error(e.message);
    res.status(500).send("Fail");
  }
});

router.post("/sendMessage", async (req, res) => {
  try {
    const b = req.body;

    const { name, private_key, chatId, text } = b;
    console.log("Sending message:", b);
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
    const toSend = await sendMessage(user._id, chatId, text);
    if (toSend) res.status(200).send("k");
    else res.status(500).send("n");
  } catch (e: any) {
    console.error(e.message);
    res.status(500).send("Fail");
  }
});

module.exports = router;
