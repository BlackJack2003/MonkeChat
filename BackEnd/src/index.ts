import express from "express";
import mongoose from "mongoose";
import User, { Email } from "./schemas/Login";
import { hashString, generateKeyPair } from "./utils/login.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const loginRouter = require("./routes/login/index");
const feedBackRouter = require("./routes/Feedback/index");
const settingsRouter = require("./routes/settings/index");

const app = express();

const dbAddr = "mongodb://127.0.0.1:27017/monkeChatDb";

async function main() {
  await mongoose.connect(dbAddr);
  console.log("Connected");
}

async function setDefaultUsers() {
  try {
    const { publicKey, privateKey } = await generateKeyPair();
    try {
      await User.findOneAndDelete({ name: "hemaang" });
      await Email.findOneAndDelete({
        username: "hemaangsood",
        domain: "gmail.com",
      });
      console.log("Successfully deleted");
    } catch (e: any) {
      console.error(
        "Failed to Delete def user to recreate trying to make any way due to:" +
          e.message
      );
    }
    const email = await Email.create({
      username: "hemaangsood",
      domain: "gmail.com",
    });
    // Inserting a new user with the populated email field
    await User.create({
      name: "hemaang",
      password: hashString("test123"), // Assuming you have a function to hash passwords
      email: email._id, // Assign the ObjectId of the created email,
      public_key: publicKey,
      private_key: privateKey,
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

app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json({ limit: "20mb" })); // for parsing application/json

app.get("*", (req, res) => {
  res.send("Wrong port goto 3000");
});

app.use("/login", loginRouter);
app.use("/feedback", feedBackRouter);
app.use("/settings", settingsRouter);

app.listen(5000);
