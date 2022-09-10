import express from "express";
import { bookingController } from "../server";


export const bookingRoutes = express.Router();

bookingRoutes.get("/", bookingController.get)