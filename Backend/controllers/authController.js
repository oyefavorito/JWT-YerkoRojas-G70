import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { crearUsuario, getUsuarioEmail } from "../models/userModel.js";

export const registrarUsuario = async (req, res) => {
  try {
    const { email, password, rol, lenguage } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await crearUsuario(email, hashedPassword, rol, lenguage);
    console.log(`Nuevo usuario registrado: ${email}`);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ha ocurrido un error durante el registro del usuario" });
  }
};

export const loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUsuarioEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas. Por favor, intenta de nuevo." });
    }
    const passwordValido = await bcrypt.compare(password, user.password);
    if (!passwordValido) {
      return res.status(401).json({ message: "Credenciales inválidas. Por favor, intenta de nuevo." });
    }
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });
    console.log(`Inicio de sesión exitoso para el usuario: ${email}`);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ha ocurrido un error interno. Por favor, inténtalo de nuevo más tarde." });
  }
};