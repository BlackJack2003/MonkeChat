import express from "express";
import Feedback from "../../schemas/Feedback";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Wrong port");
});

router.post("", async (req, res) => {
  const b = req.body;
  try {
    const [u, d] = b.email.split("@");

    await Feedback.insertMany({
      name: {
        first: b.fname,
        last: b.lname,
      },
      email: {
        username: u,
        domain: d || "gmail.com",
      },
      message: b.message,
    });
    res.json({ message: "Feedback received!!" });
  } catch (e: any) {
    console.error("Failed feedback call due to:" + e.message);
    res.json({ message: "Feedback fail!!" });
  }
});

module.exports = router;
