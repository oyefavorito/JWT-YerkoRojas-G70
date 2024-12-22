import express from "express";
import { registrarUsuario, loginUsuario } from "../controllers/authController.js";

const router = express.Router();

router.post("/usuarios", registrarUsuario);
router.post("/login", loginUsuario);

export default router;