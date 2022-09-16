import express from "express";
import { postController } from "../server";
import { isUserLoggedIn } from "../utilities/guards"

export const postRoutes = express.Router();

postRoutes.get("/", isUserLoggedIn, postController.get)