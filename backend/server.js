import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";


import authRoutes from "./routes/authroute.js";
import messageRoutes from "./routes/messageRoute.js";
import userRoutes from "./routes/userRoute.js";

import connectToMongodb from "./db/conn.js";
import { app, server } from "./socket/socket.js";


dotenv.config();

const __dirname = path.resolve();


const port =  process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());


app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);

app.use(express.static(path.join(__dirname,"/frontend/dist")))


app.get("*",(req,res) => {
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
})



server.listen(port, ()=>{
    connectToMongodb();
    console.log(`Connected to the port ${port}`);
})