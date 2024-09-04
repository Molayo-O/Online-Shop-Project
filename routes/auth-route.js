//Handling authentication routes here
import express from "express";

//include controller file
import { getSignup, signup, getLogin } from "../controllers/auth-controller.js";

const router = express.Router();

router.get("/signup", getSignup);
router.post("/signup", signup);
router.get("/login", getLogin);


export default router;
