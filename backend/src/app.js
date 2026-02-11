import express from "express";
import aiRoutes from "./routes/ai.routes.js";
import cors from "cors";

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ["GET", "POST"],
  credentials: true
}))
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.use("/ai", aiRoutes);

export default app;
