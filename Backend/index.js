import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", authRoutes);
app.use("/", userRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server on  ${PORT}`);
});