import express from "express";
import mongoose from "mongoose";
import User from "./schemas/User";
import { hashString } from "./utils/login.js"

const dbAddr = "mongodb://127.0.0.1:27017/monkeChatDb";

async function main() {
  await mongoose.connect(dbAddr);
  console.log("Connected");
}

async function setDefaultUsers()
{
  try{
    await User.insertMany({name:"hemaa",password:hashString("test123")});
    console.log("Successfully inserted def user");
  }
  catch(e)
  {
    console.log("Failed to insert def user");
  }
}

main().then(x=>setDefaultUsers()).catch((e) => {
  console.log(e.message)
});

const app = express();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post("/",async (req,res)=>{
  const b = req.body;
  var {username,password}=b;
  console.log("trying to authenticate user:"+username);
  var search =await User.findOne({name:username});
  if(search==null||search.password!==password)
    {res.status(300).send(null);
      return;
    }
  console.log("User authenticated:"+username);
	res.send(search);
});

app.get("/",(req,res)=>{
	res.send("Hello wrong port u need to be at 3000");	
});

app.listen(5000);