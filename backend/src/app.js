import express from "express";
import aiRoutes from "./routes/ai.routes.js";
import cors from "cors";

const app = express();

app.use(cors())
app.use(express.json());
console.log("Incoming Body : ", express.json());

app.use("/ai", aiRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
  
export default app;
