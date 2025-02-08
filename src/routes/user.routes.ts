import {  deactivateUserController, deleteUserController, getUserController, insertUserController, updateUserController } from "../controllers/user.controller";
import express, { Router } from "express";

export const userRouter: Router = express.Router();

userRouter.post("/", insertUserController);
userRouter.get("/", getUserController);
userRouter.delete("/:id", deleteUserController);
userRouter.patch("/:id",deactivateUserController);
userRouter.put("/:id",updateUserController); 