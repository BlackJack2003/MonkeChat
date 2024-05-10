import express from "express";
import User, { Email } from "../../schemas/Login";

const router = express.Router();

router.get("/*", async (req, res) => {
  res.send("Wrong port");
});

router.post("/changePassword", async (req, res) => {
  try {
    const b = req.body;
    const { accountName, oldpassword, newpassword } = b;
    var user = await User.findOne({ name: accountName });
    if (user == null || user.password != oldpassword) {
      console.log(`User:${accountName} not found`);
      res.status(400).send("Denied");
      return;
    }
    user.password = newpassword;
    await user.save();
    console.log("User:" + accountName + "'s password changed");
    res.send("Done");
  } catch (error) {
    console.error(error);
    res.status(400).send("Denied");
  }
});

router.post("/deleteAccount", async (req, res) => {
  try {
    const b = req.body;
    const { accountName, password } = b;
    var user = await User.findOne({ name: accountName });
    if (user == null || user.password != password) {
      res.status(400).send("Denied");
      return;
    }
    try {
      await Email.deleteOne({ _id: user.email });
    } catch (e) {}
    await User.deleteOne({ _id: user._id });
    res.send("Done");
  } catch (error) {
    console.error(error);
    res.status(500).send("Denied");
  }
});

module.exports = router;
