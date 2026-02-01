import express from "express";
import cors from "cors";
import alertRoutes from "./routes/alertRoutes.js";
import { logger } from "./middleware/logger.js";

const app = express();
const PORT = 5000;

app.use(cors({
  origin: "https://flying-panda-psi.vercel.app", 
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use(express.json());
app.use(logger);

// Use the routes
app.use("/alerts", alertRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});