import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRouter from "./routes/productRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT;

app.use("/api/products", productRouter);

app.listen(PORT, () => {
  connectDB();
  console.log(`server running at http://localhost:${PORT}`);
});
