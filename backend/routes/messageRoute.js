import express from "express";
import { sendMessage,getMessages } from "../controllers/message.controller.js";
import  protectRoute from "../middleware/protectroute.js";
const router = express.Router();

router.get("/:id",protectRoute,getMessages);
router.post("/send/:id",protectRoute,sendMessage);
//protect route function is to check whether the user is logged in or not before sending the messages
export default router;