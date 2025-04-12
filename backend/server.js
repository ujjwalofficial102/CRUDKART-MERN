import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRouter from "./routes/productRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;

app.use("/api/products", productRouter);

app.listen(PORT, () => {
  connectDB();
  console.log(`server running at http://localhost:${PORT}`);
});
