import express from "express";
import cors from "cors";
import alertRoutes from "./routes/alertRoutes.js";
import { logger } from "./middleware/logger.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(logger);

// Use the routes
app.use("/alerts", alertRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});