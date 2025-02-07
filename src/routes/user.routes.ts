import { insertUser, getUser } from "../controllers/user.controller";
import express, { Router } from "express";

export const userRouter: Router = express.Router();

userRouter.post("/", insertUser)
userRouter.get("/", getUser)