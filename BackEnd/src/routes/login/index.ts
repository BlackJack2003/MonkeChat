import express from "express";
import User, { Email } from "../../schemas/Login";

const router = express.Router();

router.post("/", async (req, res) => {
  const b = req.body;
  var { username, password } = b;
  console.log("trying to authenticate user:" + username);
  var search = await User.findOne({ name: username });
  if (search == null || search.password !== password) {
    res.status(300).send(null);
    console.log("failed to authenticate:" + username);
    return;
  }
  console.log("User authenticated:" + username);
  res.send(search);
});

router.get("/", (req, res) => {
  res.send("Wrong port u need to be at 3000");
});

router.get("/getMail", (req, res) => {
  res.send("Use post");
});

router.post("/getMail", async (req, res) => {
  var { email } = req.body;
  var [ename, domain] = email.split("@");
  var dbMail = await Email.findOne({ username: ename, domain: domain });
  if (dbMail == null || dbMail == undefined) {
    res.json({ isExist: false });
    return;
  }
  console.log("User with email:" + email + " authenticated");
  res.json({ isExist: true });
  return;
});

module.exports = router;
