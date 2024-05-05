import express from "express";
import mongoose from "mongoose";
import User, { Email } from "./schemas/Login";
import { hashString } from "./utils/login.js";

const dbAddr = "mongodb://127.0.0.1:27017/monkeChatDb";

async function main() {
  await mongoose.connect(dbAddr);
  console.log("Connected");
}

async function setDefaultUsers() {
  try {
    const email = await Email.create({
      username: "hemaangsood",
      domain: "gmail.com",
    });

    // Inserting a new user with the populated email field
    await User.create({
      name: "hemaa",
      password: hashString("test123"), // Assuming you have a function to hash passwords
      email: email._id, // Assign the ObjectId of the created email
    });

    console.log("Successfully inserted default user");
  } catch (e: any) {
    console.error(
      "Failed to insert default user or email due to:\n" + e.message
    );
  }
}

main()
  .then((x) => setDefaultUsers())
  .catch((e) => {
    console.log(e.message);
  });

const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post("/", async (req, res) => {
  const b = req.body;
  var { username, password } = b;
  console.log("trying to authenticate user:" + username);
  var search = await User.findOne({ name: username });
  if (search == null || search.password !== password) {
    res.status(300).send(null);
    return;
  }
  console.log("User authenticated:" + username);
  res.send(search);
});

app.get("/", (req, res) => {
  res.send("Hello wrong port u need to be at 3000");
});

app.post("/getMail", async (req, res) => {
  var { email } = req.body;
  var [ename, domain] = email.split("@");
  console.log("email:" + email);
  var dbMail = await Email.findOne({ username: ename, domain: domain });
  console.log(dbMail);
  if (dbMail == null || dbMail == undefined) {
    res.json({ isExist: false });
    return;
  }
  res.json({ isExist: true });
  return;
});

app.listen(5000);
