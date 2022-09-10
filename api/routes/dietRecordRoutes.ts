import express from "express";
import { dietRecordController } from "../server";


export const dietRecordRoutes = express.Router();

dietRecordRoutes.get("/", dietRecordController.get)