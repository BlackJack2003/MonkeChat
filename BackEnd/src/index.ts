import express from "express";
import mongoose from "mongoose";
import User, { Email } from "./schemas/User";
import { hashString, MyGenerateKeyPair, encryptData } from "./utils/login.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { addContact } from "./utils/contacts";

dotenv.config({ path: ".env.local" });

const loginRouter = require("./routes/login/index");
const feedBackRouter = require("./routes/Feedback/index");
const settingsRouter = require("./routes/settings/index");
const contactsRouter = require("./routes/contacts/index");
const chatRouter = require("./routes/chat/index");

const app = express();

const dbAddr: string = "mongodb://127.0.0.1:27017/monkeChatDb1";

interface Email {
  username: string;
  domain: string;
}

interface User {
  email: Email;
  name: string;
  password: string;
  public_key: string;
  private_key: string;
  image: string;
}

const usersToCreate: User[] = [
  {
    email: {
      username: "hemaangsood",
      domain: "gmail.com",
    },
    name: "hemaang",
    password: "test123",
    public_key: "",
    private_key: "",
    image: "",
  },
  {
    email: {
      username: "dev",
      domain: "1.com",
    },
    name: "dev",
    password: "test123",
    public_key: "",
    private_key: "",
    image: "",
  },
  {
    email: {
      username: "newuser1",
      domain: "example.com",
    },
    name: "newuser1",
    password: "password123",
    public_key: "",
    private_key: "",
    image: "",
  },
  {
    email: {
      username: "newuser2",
      domain: "example.org",
    },
    name: "newuser2",
    password: "password456",
    public_key: "",
    private_key: "",
    image: "",
  },
];

var _ids: string[] = [];
const del = false;
async function main() {
  try {
    await mongoose.connect(dbAddr);
    console.log("Connected");
    if (del) {
      await setDefaultUsers();

      console.log("Default users created successfully.");

      await updateUserContacts();

      console.log("User contacts updated successfully.");
    }
  } catch (error: any) {
    console.error("Failed to connect or set default users:", error.message);
  }
}

export async function setDefaultUsers() {
  try {
    mongoose.connection.db.dropDatabase();
    console.log("Successfully deleted db");
    for (const user of usersToCreate) {
      const { publicKey, privateKey } = await MyGenerateKeyPair();
      const email = await Email.create({
        username: user.email.username,
        domain: user.email.domain,
      });

      await User.create({
        name: user.name,
        password: hashString(user.password),
        email: email._id,
        public_key: publicKey,
        private_key: encryptData(user.password, privateKey),
      });

      let nu = await User.findOne({ name: user.name });
      _ids.push(nu._id);
    }
    return "Done";
  } catch (error: any) {
    throw new Error("Failed to insert default user or email: " + error.message);
  }
}

export async function updateUserContacts() {
  try {
    for (let i = 0; i < _ids.length; i += 2) {
      const itemId = _ids[i];
      let u = await User.findById(itemId);
      if (u) {
        // Filter out the current user's _id from the _ids array
        // const contacts = _ids.filter((id) => id !== itemId);

        let a1 = await User.findById(itemId);
        let a2 = await User.findById(_ids[i + 1]);
        await addContact(a1.name, a2.name);
        // contacts.map(async (x) => {

        // });
        // u.contacts = contacts;
        // await u.save();
        console.log("Successfully added contacts for user:", u.name);
      }
    }
  } catch (error: any) {
    throw new Error("Failed to update user contacts: " + error.message);
  }
}

main().catch((err) => console.error(err));

app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json({ limit: "20mb" })); // for parsing application/json

app.get("*", (req, res) => {
  res.send("Wrong port goto 3000");
});

app.use("/login", loginRouter);
app.use("/feedback", feedBackRouter);
app.use("/settings", settingsRouter);
app.use("/contacts", contactsRouter);
app.use("/chat", chatRouter);

app.listen(5000);
