import express from "express";
import mongoose from "mongoose";
import User, { Email } from "./schemas/Login";
import { hashString } from "./utils/login.js";

const loginRouter = require("./routes/login/index");
const feedBackRouter = require("./routes/Feedback/index");

const app = express();

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
      password: hashString("hemustest123"), // Assuming you have a function to hash passwords
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

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("", (req, res) => {
  res.send("Wrong port goto 3000");
});

app.use("/login", loginRouter);
app.use("/feedback", feedBackRouter);

app.listen(5000);
