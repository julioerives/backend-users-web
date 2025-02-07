import { deleteUserController, getUserController, insertUserController } from "../controllers/user.controller";
import express, { Router } from "express";

export const userRouter: Router = express.Router();

userRouter.post("/", insertUserController);
userRouter.get("/", getUserController);
userRouter.delete("/:id", deleteUserController);