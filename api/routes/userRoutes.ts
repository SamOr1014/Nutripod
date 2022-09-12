import express from "express";
import { userController } from "../server";


export const userRoutes = express.Router();

userRoutes.post("/", userController.login)
// userRoutes.post("/", userController.get)
// userRoutes.put("/", userController.get)
// userRoutes.delete("/", userController.get)
