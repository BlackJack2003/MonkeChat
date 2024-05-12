import express from "express";
const router = express.Router();
import User from "../../schemas/Login";

interface contactInterface {
  userName: string;
  img?: string;
}

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

module.exports = router;
