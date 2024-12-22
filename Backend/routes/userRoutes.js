import express from "express";
import { getUsuario } from "../controllers/userController.js";
import authToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/usuarios", authToken, getUsuario);

export default router;