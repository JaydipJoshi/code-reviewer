import express from "express";
import aiRoutes from "./routes/ai.routes.js";
import cors from "cors";

const app = express();

app.use(cors())
app.use(express.json());
console.log("Incoming Body : ", req.body);


app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.use("/ai", aiRoutes);

export default app;
