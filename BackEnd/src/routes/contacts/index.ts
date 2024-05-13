import express from "express";
const router = express.Router();
import mongoose from "mongoose";
import User from "../../schemas/User";

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
    const promises = user.contacts.map(async (contact: string) => {
      const p = await User.findById(contact);
      return { userName: p.name, img: p.image };
    });

    Promise.all(promises)
      .then((result) => {
        res.json(result);
        console.log("Sent contacts of user:" + name);
        return;
      })
      .catch((error) => {
        console.error("Error occurred while processing contacts:", error);
        res.status(500).json({ error: "An error occurred" });
      });
  } catch (e: any) {
    res.status(500).send("Nope");
    console.error(e.message);
    return;
  }
});

router.post("/addContact", async (req, res) => {
  try {
    const b = req.body;
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
    const a_user = await User.findOne({ name: user_to_add });
    if (a_user == null || a_user == undefined) {
      res.status(500).send("Nope");
      console.log("User:" + name + " not found");
      return;
    }
    user.contacts.push(a_user._id);
    await user.save();
    res.send("Done");
    return;
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send("An error occurred while adding contact");
    return;
  }
});

module.exports = router;
