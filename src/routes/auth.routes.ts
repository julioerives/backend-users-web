import express, { Router } from "express";
import { logInController } from "../controllers/auth.controller";

export const authRouter:Router = Router();

authRouter.post("/login", logInController);