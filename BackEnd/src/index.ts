import express from "express";
import mongoose from "mongoose";

mongoose.connect("mongodb://localhost/monkeChatDb")

const app = express();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const user = {id:"42",name:"hemaa",password:"test123"};

app.post("/",(req,res)=>{
	console.log(req.body);
	res.send(user);
});

app.get("/",(req,res)=>{
	
	res.send("Hello wrong port u need to be at 3000");	
});

app.listen(5000);
