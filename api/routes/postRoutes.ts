import express from "express";
import { postController } from "../server";


export const postRoutes = express.Router();

postRoutes.get("/", postController.get)