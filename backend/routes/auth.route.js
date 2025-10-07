import express, { Router } from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";
import isAuth from "../middleware/isAuth.js"

const authRouter=express.Router();

authRouter.post("/signup",signup);
authRouter.post("/login",login);
authRouter.get("/logout",logout);

export default authRouter;