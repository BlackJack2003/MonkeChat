import express from "express";
import User, { Email } from "../../schemas/Login";

const router = express.Router();

router.get("", async (req, res) => {
  res.send("Wrong port");
});

router.post("", async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
  }
});
