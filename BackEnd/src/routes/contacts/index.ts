import express from "express";
const router = express.Router();
import User from "../../schemas/User";
import { addContact } from "../../utils/contacts";

router.post("/getContacts", async (req, res) => {
  try {
    // Handle POST request logic here
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
    var toSend: { userName: string; img: string }[] = [];
    for (let i = 0; i < user.contacts.length; i++) {
      var contact: string = user.contacts[i].cid;
      const p = await User.findById(contact);
      if (p != null) toSend.push({ userName: p.name, img: p.image });
    }

    res.json(toSend);
    console.log("Sent contacts of user:" + name);
    return;
  } catch (e: any) {
    res.status(500).json([]);
    console.error(e.message);
    return;
  }
});

router.post("/addContact", async (req, res) => {
  try {
    const b = req.body;
    console.log(b);
    const { name, private_key, user_to_add } = b;
    var user = await User.findOne({ name: name });

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
    var x = await addContact(name, user_to_add);
    if (x) {
      res.send("Done");
      return;
    } else {
      res.status(500).send("An error occurred while adding contact");
      return;
    }
  } catch (e: any) {
    console.error(e.message);
    res.status(500).send("An error occurred while adding contact");
    return;
  }
});

module.exports = router;
