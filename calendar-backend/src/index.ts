import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth";
import eventsRouter from "./routes/events";
import { dbConnection } from "./database/config";
import cors from "cors";
dotenv.config();
const app = express();
app.use(express.json());

// database connection
dbConnection();

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

// CORS
app.use(cors());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/events", eventsRouter);
