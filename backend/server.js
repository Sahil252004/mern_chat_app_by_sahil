import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authroute.js";
import messageRoutes from "./routes/messageRoute.js";
import userRoutes from "./routes/userRoute.js";

import connectToMongodb from "./db/conn.js";
const app = express();
const port =  process.env.PORT || 5000;
import bodyparser from "body-parser";
app.use(bodyparser.json());


dotenv.config();
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);
// to parse the incoming requests with JSON payloads(from req.body)
// app.get("/",(req,res) => {
//     res.send("Hello World");
// })



app.listen(port, ()=>{
    connectToMongodb();
    console.log(`Connected to the port ${port}`);
})