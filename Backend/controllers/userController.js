import { getUsuarioEmail } from "../models/userModel.js";

export const getUsuario = async (req, res) => {
  try {
    const { email } = req.user;
    const user = await getUsuarioEmail(email);
    if (!user) {
      return res.status(404).json({ message: "No se pudo encontrar el usuario especificado." });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Usuario no encontrado" });
  }
};