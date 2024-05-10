import express from "express";
import User, { Email } from "../../schemas/Login";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const b = req.body;
    var { username, password } = b;
    username = (username as string) || "";
    password = (password as string) || "";
    var search = null;
    console.log("trying to authenticate user:" + username);
    if (username.includes("@") && username.includes(".")) {
      const [a, b] = username.split("@");
      var email = await Email.findOne({ username: a, domain: b });
      if (email != null) {
        search = await User.findOne({ email: email._id }).populate("email");
      }
    } else {
      console.log("Looking for username:" + username);
      search = await User.findOne({ name: username }).populate("email");
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
  } catch (e: any) {
    res.status(500).send(null);
    return;
  }
});

router.get("/*", (req, res) => {
  res.send("Wrong port u need to be at 3000");
});

router.post("/getMail", async (req, res) => {
  try {
    var { email } = req.body;
    var [ename, domain] = email.split("@");
    var dbMail = await Email.findOne({ username: ename, domain: domain });
    if (dbMail == null || dbMail == undefined) {
      console.log("User with email:" + email + " failed to authenticated");
      res.json({ isExist: false });
      return;
    }
    console.log("User with email:" + email + " authenticated");
    res.json({ isExist: true });
    return;
  } catch (e: any) {
    console.error(e.message);
    res.json({ isExist: false });
    return;
  }
});

router.post("/signUp", async (req, res) => {
  try {
    const b = req.body;
    var { username, password, img, email } = b;
    var [ename, domain] = email.split("@");
    var dbMail = await Email.findOne({ username: ename, domain: domain });
    if (dbMail != null) {
      res.status(406).send("Email Exists");
      console.log("Email exists!!");
      return;
    }
    var dbUname = await User.findOne({ name: username });
    if (dbUname != null) {
      res.status(406).send("Username Exists");
      return;
    }
    let emailInsert;
    try {
      emailInsert = await Email.create({
        username: ename,
        domain: domain,
      });
    } catch (e: any) {
      console.error("Email cannot be created due to:" + e.message);
      res.status(500).send("Email creation failed");
      return;
    }
    let user;
    try {
      user = await User.create({
        name: username,
        password: password,
        image: img,
        email: emailInsert._id,
      });
      res.send("User:" + username + "+ created");
    } catch (e: any) {
      try {
        await Email.deleteOne({ username: ename, domain: domain });
      } catch (cleanupError: any) {
        console.error("Error cleaning up email:", cleanupError.message);
      }
      console.error("User cannot be created due to:" + e.message);
      return res.status(500).send("Internal server error (user creation)");
    }
  } catch (e: any) {
    console.error(e.message);
    res.status(500).send("Internal Error 123");
  }
});

module.exports = router;
